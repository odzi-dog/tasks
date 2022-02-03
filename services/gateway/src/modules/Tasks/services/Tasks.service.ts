import { BackendConnectionService } from '@app/modules/BackendConnection/services';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { IPinTaskRequest, IUnpinTaskRequest, IFetchOneTaskRequest, IFetchCollectionTasksRequest, ITask, EBackendRequests, IFetchUserTasksRequest, CreateTaskDTO, ICreateTaskRequest } from '@shared/types';

// @service TasksService
// - All tasks-related backend requests
@Injectable()
export class TasksService {
  constructor(
    private readonly connection: BackendConnectionService,
  ) {}

  // @method fetchOne
  public fetchOne(taskId: string | Types.ObjectId): Observable<ITask> {
    return this.connection.client.send(
      EBackendRequests.FETCH_ONE_TASK,
      <IFetchOneTaskRequest>{
        taskId: String(taskId),
      },
    );
  };

  // @method fetchCollectionTasks
  public fetchCollectionTasks(collectionId: string | Types.ObjectId): Observable<ITask[]> {
    return this.connection.client.send(
      EBackendRequests.FETCH_COLLECTION_TASKS,
      <IFetchCollectionTasksRequest>{
        collectionId: String(collectionId),
      },
    );
  };

  // @method fetchUserTasks
  public fetchUserTasks(userId: string | Types.ObjectId): Observable<ITask[]> {
    return this.connection.client.send(
      EBackendRequests.FETCH_USER_TASKS,
      <IFetchUserTasksRequest>{
        id: String(userId)
      },
    );
  };

  // @method pinTask
  public pinTask(taskId: string | Types.ObjectId): Observable<ITask> {
    return this.connection.client.send(
      EBackendRequests.PIN_TASK,
      <IPinTaskRequest>{
        taskId: String(taskId),
      },
    );
  };

  // @method unpinTask
  public unpinTask(taskId: string | Types.ObjectId): Observable<ITask> {
    return this.connection.client.send(
      EBackendRequests.UNPIN_TASK,
      <IUnpinTaskRequest>{
        taskId: String(taskId),
      },
    );
  };

  // @method createTask
  public createTask(userId: string | Types.ObjectId, input: CreateTaskDTO, collectionId?: string | Types.ObjectId, taskId?: string | Types.ObjectId): Observable<ITask> {
    return this.connection.client.send(
      EBackendRequests.CREATE_TASK,
      <ICreateTaskRequest>{
        userId: String(userId),
        task: input,
        collectionId: collectionId ? String(collectionId) : null,
        taskId: taskId ? String(taskId) : null,
      },
    );
  };
};