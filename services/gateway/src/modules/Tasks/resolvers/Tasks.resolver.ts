import { RequiredUserAuthGuard } from '@app/helpers';
import { TaskObject } from '@app/objects';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from '../services';
import { IUser } from '@shared/types';
import { firstValueFrom } from 'rxjs';
import { CreateTaskInput } from '@app/inputs';

@Resolver()
export class TasksResolver {
  constructor(
    private readonly service: TasksService,
  ) {}

  // @query fetchTask

  // @query fetchUserTasks
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => [TaskObject], {
    name: 'UserTasks',
    description: "Fetch all current user's tasks"
  })
  public async fetchUserTasks(
    @Context('user') user: IUser,
  ) {
    // Fetching all user tasks
    return await firstValueFrom(this.service.fetchUserTasks(user._id), { defaultValue: [] });
  };

  // @query fetchPinnedTasks
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => [TaskObject], {
    name: 'PinnedTasks',
    description: 'Fetch all pinned tasks of a user',
    defaultValue: []
  })
  public async fetchPinnedTasks(
    @Context('user') user: IUser
  ) {
    // Fetching all user tasks
    const tasks = await firstValueFrom(this.service.fetchUserTasks(user._id), { defaultValue: [] });

    // Filtering and returning only pinned tasks
    return tasks.filter((task) => task.isTaskPinned);
  };

  // @mutation pinTask
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => TaskObject, {
    name: 'PinTask',
    description: 'Pinned tasks (and collections) are showed in sidebar'
  })
  public async pinTask(
    @Context('user') user: IUser,
    @Args('taskId') taskId: string,
  ) {
    // Fetching this task
    const task = await firstValueFrom(this.service.fetchOne(taskId));

    // Checking if this user can modify it
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (task?.ownerId)
      if (String(task?.ownerId) != String(user._id)) throw new HttpException("This task doesn't belong to this user", HttpStatus.UNAUTHORIZED);
  
    // Updating
    return await firstValueFrom(this.service.pinTask(task._id));
  };

  // @mutation unpinTask
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => TaskObject, {
    name: 'UnpinTask',
    description: 'Unpin pinned task'
  })
  public async unpinTask(
    @Context('user') user: IUser,
    @Args('taskId') taskId: string,
  ) {
    // Fetching this task
    const task = await firstValueFrom(this.service.fetchOne(taskId));

    // Checking if this user can modify it
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (task?.ownerId)
      if (String(task?.ownerId) != String(user._id)) throw new HttpException("This task doesn't belong to this user", HttpStatus.UNAUTHORIZED);
  
    // Updating
    return await firstValueFrom(this.service.unpinTask(task._id));
  };

  // @mutation createTask
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => TaskObject, {
    name: 'CreateTask',
    description: "Creates new task for specified collection or user",
  })
  public async createTask(
    @Context('user') user: IUser,
    
    @Args('input') input: CreateTaskInput,
    @Args('collectionId', { nullable: true, description: "Collection id, to which this task needs to be assigned" }) collectionId?: string,
    @Args('taskId', { nullable: true, description: "Task id, to which this task needs to be assigned" }) taskId?: string,
  ) {
    return await firstValueFrom(this.service.createTask(user._id, input, collectionId, taskId));
  };
};