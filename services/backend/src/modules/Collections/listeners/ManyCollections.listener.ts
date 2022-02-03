import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EBackendRequests, ICollection, IFetchUserCollectionsRequest } from '@shared/types';
import { Types } from 'mongoose';
import { CollectionsService } from '../services';

// @controller ManyCollectionsListener
// - Basic fetchUserCollections, searchUserCollections and so on
@Controller()
export class ManyCollectionsListener {
  constructor(
    private readonly service: CollectionsService,
  ) {}
  
  // @event fetchUserCollections
  @EventPattern(EBackendRequests.FETCH_USER_COLLECTIONS)
  public async fetchUserCollection(
    payload: IFetchUserCollectionsRequest,
  ): Promise<ICollection[]> {
    // Fetching
    console.log(await this.service.fetchByUser(new Types.ObjectId(payload.id)));
    return await this.service.fetchByUser(new Types.ObjectId(payload.id));
  };

  // @event fetchPinnedUserCollections

  // @event searchUserCollections
};