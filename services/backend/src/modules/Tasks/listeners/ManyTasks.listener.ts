import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TasksService } from '../services';
import { Types } from 'mongoose';
import { EBackendRequests, IFetchUserTasksRequest, ICreateTaskRequest } from '@shared/types';

// @controller ManyTasksListener
// - Contains all basic CRUD operations on a
// array of tasks.
@Controller()
export class ManyTasksListener {
  constructor(
    private readonly service: TasksService,
  ) {}

  // @event fetchUserTasks
  // - Fetch all root, child and collection child
  // tasks (all tasks overall)
  @EventPattern(EBackendRequests.FETCH_USER_TASKS)
  public async fetchUserTasks(
    payload: IFetchUserTasksRequest
  ) {
    return await this.service.fetchUserTasks(new Types.ObjectId(payload.id));
  };
};