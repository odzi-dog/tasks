import { TaskDocument } from '@app/models';
import { CollectionsService } from '@app/modules/Collections/services';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateTaskDTO, EParentType, IParent } from '@shared/types';

// @service TasksService
// - Contains all tasks-related operations
@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<TaskDocument>,

    private readonly CollectionsService: CollectionsService,
  ) {}

  // @method _fetch
  public async _fetch(query: FilterQuery<TaskDocument>) {
    const tasks = await this.taskModel.find(query);
    return tasks.map((task) => {
      task.__model = "task";
      return task;
    });
  };

  // @method fetchCollectionTasks
  public async fetchCollectionTasks(collectionId: Types.ObjectId) {
    // Fetching all user's root tasks
    const tasks = await this._fetch({ 'parent.id': collectionId });
    const childTasks = [];

    for (const task of tasks) {
      childTasks.push(...(await this._findChildTasks(task._id)));
    };

    // Returning all tasks (root and child ones)
    return [...tasks, ...childTasks];  
  };

  // @method fetchUserTasks
  public async fetchUserTasks(userId: Types.ObjectId) {
    // Fetching all user's root tasks
    const tasks = await this._fetch({ 'parent.id': userId });
    const childTasks = [];

    for (const task of tasks) {
      childTasks.push(...(await this._findChildTasks(task._id)));
    };

    // Fetching all user's collections
    const collections = await this.CollectionsService.fetchByUser(userId);

    for (const collection of collections) {
      tasks.push(...(await this._findChildTasks(collection._id)));
    };

    // Returning all tasks (root and child ones)
    return [...tasks, ...childTasks];
  };

  // @method fetchCollectionTasks

  // @private method _findChildTasks
  private async _findChildTasks(parentId: Types.ObjectId) {
    // Finding all child tasks
    const rootTasks = await this._fetch({ 'parent.id': parentId });
    const childTasks = [];

    if (rootTasks.length > 0) {
      for (const task of rootTasks) {
        childTasks.push(...(await this._findChildTasks(task._id)));
      };
    };

    return [...rootTasks, ...childTasks];
  };

  // @method pinTask
  // +todo simplify
  public async pinTask(taskId: Types.ObjectId) {
    // Getting this task
    const task = (await this._fetch({ _id: taskId }))[0];
    if (!task) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

    // Updating
    task.isTaskPinned = true;
    await task.updateOne(task);
    return task;
  };

  // @method unpinTask
  // +todo simplify
  public async unpinTask(taskId: Types.ObjectId) {
    // Getting this task
    const task = (await this._fetch({ _id: taskId }))[0];
    if (!task) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

    // Updating
    task.isTaskPinned = false;
    await task.updateOne(task);
    return task;
  };

  // @method create
  public async create(userId: Types.ObjectId, input: CreateTaskDTO, collectionId?: Types.ObjectId, taskId? : Types.ObjectId) {
    // if (collectionId) {
    //   // Checking if this collection belongs to this user
    //   const collections = await this.CollectionsService.fetchByUser(userId);
    //   if (!collections.find((x) => String(x._id) == String(collectionId))) throw new HttpException('This collection does not belong to this user', HttpStatus.UNAUTHORIZED);
    // };

    // if (taskId) {
    //   // Checking if we have this task (we are not going to check
    //   // if this task belongs to user, because fuck it)
    //   const task = await
    // };

    // Determining parent object
    let parent: IParent;

    if (collectionId && taskId) {
      throw new HttpException('Task can not belong to another task and to collection simultaneously', HttpStatus.BAD_REQUEST)
    } else {
      if (collectionId) {
        // Collection parent
        parent = {
          type: EParentType.COLLECTION,
          id: collectionId,
        };
      } else if (taskId) {
        // Task parent
        parent = {
          type: EParentType.TASK,
          id: taskId,
        };
      } else {
        // User parent
        parent = {
          type: EParentType.USER,
          id: userId,
        };
      };
    };

    // Creating new task
    const task = new this.taskModel({
      icon: input.icon,
      title: input.title,
      subtitle: input.subtitle,
      ownerId: userId,

      // Parent information
      parent,
    });

    // Returning created task
    return await task.save();
  };
};