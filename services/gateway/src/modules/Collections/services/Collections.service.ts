import { BackendConnectionService } from '@app/modules/BackendConnection/services';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { IPinCollectionRequest, IUnpinCollectionRequest, ICollection, EBackendRequests, IFetchUserCollectionsRequest, CreateCollectionDTO, ICreateUserCollectionRequest, IFetchOneCollectionsRequest } from '@shared/types';

// @service Collections
// - All collections-related methods
@Injectable()
export class CollectionsService {
  constructor(
    private readonly connection: BackendConnectionService,
  ) {}

  // @method fetchById
  public fetchById(collectionId: string | Types.ObjectId): Observable<ICollection> {
    return this.connection.client.send(
      EBackendRequests.FETCH_ONE_COLLECTION,
      <IFetchOneCollectionsRequest>{
        collectionId: String(collectionId),
      },
    )
  };

  // @method fetchUserCollections
  public fetchUserCollections(userId: string | Types.ObjectId): Observable<ICollection[]> {
    // Fetching
    return this.connection.client.send(
      EBackendRequests.FETCH_USER_COLLECTIONS,
      <IFetchUserCollectionsRequest>{
        id: String(userId),
      },
    );
  };

  // @method pinCollection
  public pinCollection(collectionId: string | Types.ObjectId): Observable<ICollection> {
    return this.connection.client.send(
      EBackendRequests.PIN_COLLECTION,
      <IPinCollectionRequest>{
        collectionId
      },
    );
  };

  // @method unpinCollection
  public unpinCollection(collectionId: string | Types.ObjectId): Observable<ICollection> {
    return this.connection.client.send(
      EBackendRequests.UNPIN_COLLECTION,
      <IUnpinCollectionRequest>{
        collectionId
      },
    );
  };

  // @method create
  public createCollection(userId: string | Types.ObjectId, input: CreateCollectionDTO) {
    return this.connection.client.send(
      EBackendRequests.CREATE_COLLECTION,
      <ICreateUserCollectionRequest>{
        id: userId,
        collection: input,
      },
    );
  };
};