import { BackendConnectionService } from '@app/modules/BackendConnection/services';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { IFetchOneTaskSessionRequest, IEndTaskSessionRequest, IStartTaskSessionRequest, ITaskSession, FilterTaskServiceDTO, EBackendRequests, IFetchTaskSessionRequest, CLIENT_CONNECTION_UPDATE_EVENT } from '@shared/types';

@Injectable()
export class TaskSessionService {
  constructor(
    private readonly connection: BackendConnectionService,
  ) {}

  // method fetchOne
  public fetchOne(
    sessionId: string | Types.ObjectId,
  ): Observable<ITaskSession> {
    return this.connection.client.send(EBackendRequests.FETCH_ONE_TASK_SESSION, <IFetchOneTaskSessionRequest>{
      sessionId: String(sessionId),
    });
  };

  // method fetchTaskSessions
  public fetchTaskSession(
    taskId: string | Types.ObjectId,
    filter?: FilterTaskServiceDTO,
  ): Observable<Array<ITaskSession>> {
    return this.connection.client.send(EBackendRequests.FETCH_TASK_SESSIONS, <IFetchTaskSessionRequest>{
      taskId: String(taskId),
      filter,
    });
  };

  // method startSession
  public startSession(
    taskId: string | Types.ObjectId,
  ): Observable<ITaskSession> {
    return this.connection.client.send(EBackendRequests.START_TASK_SESSION, <IStartTaskSessionRequest>{
      taskId: String(taskId),
    });
  };

  // method endSession
  public endSession(
    sessionId: string | Types.ObjectId,
  ): Observable<ITaskSession> {
    return this.connection.client.send(EBackendRequests.END_TASK_SESSION, <IEndTaskSessionRequest>{
      sessionId: String(sessionId),
    });
  };
};