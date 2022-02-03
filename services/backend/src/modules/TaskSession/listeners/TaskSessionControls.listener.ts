import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { IEndTaskSessionRequest, EBackendRequests, IStartTaskSessionRequest } from '@shared/types';
import { TaskSessionService } from '../services';

// @controller
@Controller()
export class TaskSessionControlsListener {
  constructor(
    private readonly service: TaskSessionService,
  ) {}
  
  // @event startSession
  @EventPattern(EBackendRequests.START_TASK_SESSION)
  public async startTaskSession(
    payload: IStartTaskSessionRequest,
  ) {
    return await this.service.startSession(new Types.ObjectId(payload.taskId));
  };

  // @event endSession
  @EventPattern(EBackendRequests.END_TASK_SESSION)
  public async endTaskSession(
    payload: IEndTaskSessionRequest,
  ) {
    return await this.service.endSession(new Types.ObjectId(payload.sessionId));
  };
};