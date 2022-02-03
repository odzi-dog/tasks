import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IPinCollectionRequest, IUnpinCollectionRequest, IFetchCollectionTasksRequest, EBackendRequests, ICreateUserCollectionRequest, IFetchOneCollectionsRequest } from '@shared/types';
import { CollectionsService } from '../services';
import { Types } from 'mongoose';
import { TasksService } from '@app/modules/Tasks/services';

// @controller SingleCollectionListener
// - Basic CRUD operations on single collections
@Controller()
export class SingleCollectionListener {
  constructor(
    private readonly service: CollectionsService,

    private readonly tasksService: TasksService,
  ) {}
  
  // @event fetch
  @EventPattern(EBackendRequests.FETCH_ONE_COLLECTION)
  public async fetchCollection(
    payload: IFetchOneCollectionsRequest,
  ) {
    return (await this.service._fetch({ _id: new Types.ObjectId(payload.collectionId) }))[0];
  };

  // @event fetchCollectionTasks
  @EventPattern(EBackendRequests.FETCH_COLLECTION_TASKS)
  public async fetchCollectionTasks(
    payload: IFetchCollectionTasksRequest
  ) {
    return await this.tasksService.fetchCollectionTasks(new Types.ObjectId(payload.collectionId));
  };

  // @event pinCollection
  @EventPattern(EBackendRequests.PIN_COLLECTION)
  public async pinCollection(
    payload: IPinCollectionRequest
  ) {
    return await this.service.pinCollection(new Types.ObjectId(payload.collectionId));
  };

  // @event unpinCollection
  @EventPattern(EBackendRequests.UNPIN_COLLECTION)
  public async unpinCollection(
    payload: IUnpinCollectionRequest
  ) {
    return await this.service.unpinCollection(new Types.ObjectId(payload.collectionId));
  };

  // @event update
  
  // @event create
  @EventPattern(EBackendRequests.CREATE_COLLECTION)
  public async createCollection(
    payload: ICreateUserCollectionRequest
  ) {
    return await this.service.create(new Types.ObjectId(payload.id), payload.collection);
  };
};