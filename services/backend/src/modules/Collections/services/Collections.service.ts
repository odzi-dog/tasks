import { CollectionDocument } from '@app/models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { EParentType, CreateCollectionDTO } from '@shared/types';
import { UsersService } from '@app/modules/User/services';

// @service Collections
// - Responsible for ALL collection-related methods
@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel('Collection')
    private readonly collectionModel: Model<CollectionDocument>,
  
    private readonly UsersService: UsersService,
  ) {}

  // private _findChildCollections
  private async _findChildCollections(parentId: Types.ObjectId) {
    const rootCollections = await this.collectionModel.find({
      'parent.id': parentId,
    });

    const childCollections = [];

    if (rootCollections.length > 0) {
      for (const collection of rootCollections) {
        childCollections.push(...(await this._findChildCollections(collection._id)));
      };
    };

    return [...rootCollections, ...childCollections];
  };

  // method _fetch
  public async _fetch(query: FilterQuery<CollectionDocument>) {
    const collections = await this.collectionModel.find(query);
    return collections.map((collection) => {
      collection.__model = "collection";
      return collection;
    });
  };

  // method fetchByUser
  public async fetchByUser(id: Types.ObjectId) {
    return await this._findChildCollections(id);
  };

  // method pinCollection
  public async pinCollection(collectionId: Types.ObjectId) {
    // Fetching this collection
    const collection = (await this._fetch({ _id: collectionId }))[0];
    if (!collection) throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);

    // Updating
    collection.isCollectionPinned = true;
    await collection.updateOne(collection);
    return collection;
  };

  // method unpinCollection
  public async unpinCollection(collectionId: Types.ObjectId) {
    // Fetching this collection
    const collection = (await this._fetch({ _id: collectionId }))[0];
    if (!collection) throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);

    // Updating
    collection.isCollectionPinned = false;
    await collection.updateOne(collection);
    return collection;
  };

  // method create
  public async create(userId: Types.ObjectId, payload: CreateCollectionDTO) {
    // Fetching user with this id
    const user = await this.UsersService.fetch({ _id: userId });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // Creating new collection
    const collection = new this.collectionModel({
      title: payload.title,
      subtitle: payload.subtitle,
      
      ownerId: userId,

      // Parent is user
      parent: {
        type: EParentType.USER,
        id: userId,
      },
    });

    return await collection.save();
  };
};