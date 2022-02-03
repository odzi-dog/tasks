import { OptionalUserAuthGuard, RequiredUserAuthGuard } from '@app/helpers';
import { CollectionObject } from '@app/objects';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from '../services';
import { IUser, ICollection } from '@shared/types';
import { firstValueFrom } from 'rxjs';
import { CreateCollectionInput } from '@app/inputs';

// @resolver Collections
// - All collection-related queries and mutations
@Resolver()
export class CollectionsResolver {
  constructor(
    private readonly service: CollectionsService,
  ) {}

  // @query fetchCollection
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => CollectionObject, {
    name: 'Collection',
    description: "Fetch user collection by it's system id"
  })
  public async fetchCollection(
    @Args('id') id: string,
    @Context('user') user: IUser,
  ) {
    // Fetching this collection
    const collection: ICollection = await firstValueFrom(this.service.fetchById(id), { defaultValue: null });

    // Checking if it exists
    if (!collection) throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);

    // Checking if this user can access this collection
    // if (String(collection.parent?.id) != String(user._id)) throw new HttpException("This collection do not belong to this user", HttpStatus.UNAUTHORIZED);

    return collection;
  };

  // @query fetchUserCollections
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => [CollectionObject], {
    name: 'UserCollections',
    description: 'Fetches current user collections'
  })
  public async fetchUserCollections(
    @Context('user') user: IUser
  ) {
    return await firstValueFrom(this.service.fetchUserCollections(user._id), { defaultValue: [] });
  };

  // @query fetchPinnedCollection
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => [CollectionObject], {
    name: 'PinnedCollections',
    description: "Fetch all user's pinned collections",
    defaultValue: [],
  })
  public async fetchPinnedCollections(
    @Context('user') user: IUser
  ) {
    // Fetching all user collections
    const collections = await firstValueFrom(this.service.fetchUserCollections(user._id), { defaultValue: [] });
  
    // Filtering and returning
    return collections.filter((collection) => collection.isCollectionPinned);
  };

  // @mutation pinCollection
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => CollectionObject, {
    name: 'PinCollection',
    description: 'Pins collection to user sidebar'
  })
  public async pinCollection(
    @Context('user') user: IUser,
    @Args('collectionId') collectionId: string,
  ) {
    // Fetching this collection
    const collection = await firstValueFrom(this.service.fetchById(collectionId));

    // Checking if this user can modify this collection
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (collection?.ownerId)
      if (String(collection?.ownerId) != String(user._id)) throw new HttpException("This collection doesn't belong to this user", HttpStatus.UNAUTHORIZED);
  
    // Updating
    return await firstValueFrom(this.service.pinCollection(collectionId));
  };

  // @mutation unpinCollection
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => CollectionObject, {
    name: 'UnpinCollection',
    description: 'Unping specific collection'
  })
  public async unpinCollection(
    @Context('user') user: IUser,
    @Args('collectionId') collectionId: string,
  ) {
    // Fetching this collection
    const collection = await firstValueFrom(this.service.fetchById(collectionId));

    // Checking if this user can modify this collection
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (collection?.ownerId)
      if (String(collection?.ownerId) != String(user._id)) throw new HttpException("This collection doesn't belong to this user", HttpStatus.UNAUTHORIZED);
  
    // Updating
    return await firstValueFrom(this.service.unpinCollection(collectionId));
  };

  // @mutation createCollection
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => CollectionObject, {
    name: 'CreateCollection',
    description: 'Create a new collection'
  })
  public async createCollection(
    @Args('input') input: CreateCollectionInput,
    @Context('user') user: IUser,
  ) {
    // Creating collection and returning it
    return await firstValueFrom(this.service.createCollection(user._id, input));
  };
};