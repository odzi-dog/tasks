import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { IFetchOneTaskRequest, EBackendRequests, ICreateTaskRequest, IPinTaskRequest, IUnpinTaskRequest } from '@shared/types';
import { TasksService } from '../services';

@Controller()
export class SingleTaskListener {
  constructor(
    private readonly service: TasksService,
  ) {}
  
  // @event fetchOne
  @EventPattern(EBackendRequests.FETCH_ONE_TASK)
  public async fetchOne(
    payload: IFetchOneTaskRequest
  ) {
    return (await this.service._fetch({ _id: new Types.ObjectId(payload.taskId) }))[0];
  };

  // @event pinTask
  @EventPattern(EBackendRequests.PIN_TASK)
  public async pinTask(
    payload: IPinTaskRequest,
  ) {
    return await this.service.pinTask(new Types.ObjectId(payload.taskId));
  };

  // @event unpinTask
  @EventPattern(EBackendRequests.UNPIN_TASK)
  public async unpinTask(
    payload: IUnpinTaskRequest,
  ) {
    return await this.service.unpinTask(new Types.ObjectId(payload.taskId));
  };

  // @event createTask
  // - Create new task and automatically
  // assign it to collection (or to user)
  @EventPattern(EBackendRequests.CREATE_TASK)
  public async createUserTask(
    payload: ICreateTaskRequest,
  ) {
    return await this.service.create(
      new Types.ObjectId(payload.userId), 
      payload.task,
      payload.collectionId != null ? new Types.ObjectId(payload.collectionId) : null,
      payload.taskId != null ? new Types.ObjectId(payload.taskId) : null,
    );
  };
};