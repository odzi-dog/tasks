import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { IFetchOneTaskSessionRequest, EBackendRequests, IFetchTaskSessionRequest } from '@shared/types';
import { TaskSessionService } from '../services';

@Controller()
export class TaskSessionListener {
  constructor(
    private readonly service: TaskSessionService,
  ) {}

  // @event fetchOne
  @EventPattern(EBackendRequests.FETCH_ONE_TASK_SESSION)
  public async fetchOneTaskSession(
    payload: IFetchOneTaskSessionRequest,
  ) {
    return await this.service.fetchOne(new Types.ObjectId(payload.sessionId));
  };

  // @event fetchTaskSessions
  @EventPattern(EBackendRequests.FETCH_TASK_SESSIONS)
  public async fetchTaskSessions(
    payload: IFetchTaskSessionRequest,
  ) {
    return await this.service.fetchTaskSessions(new Types.ObjectId(payload.taskId), payload.filter);
  };
};