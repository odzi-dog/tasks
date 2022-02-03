// Importing modules
import { ParentUnion } from '@app/unions';
import { ObjectType, Field } from '@nestjs/graphql';
import { ICollectionObject, TParentObject, ITaskObject } from '@shared/types';
import { Types } from 'mongoose';
import { TaskObject } from '..';

// Exporting Collection object
@ObjectType('Collection', {
  description: 'Basic collection object.'
})
export class CollectionObject implements ICollectionObject {
  @Field(type => String, { description: 'System id of this collection' })
  _id: Types.ObjectId;

  @Field({ description: 'Icon. Can be Unicode emoji.', nullable: true })
  icon?: string;

  // Collection tasks
  @Field(type => [TaskObject], { description: 'Collection tasks', defaultValue: [] })
  tasks: ITaskObject[];

  @Field({ description: 'Is collection pinned?', defaultValue: false })
  isCollectionPinned: boolean;

  // Parent
  @Field(type => ParentUnion, { description: 'Parent entity can hold information about User (to which this collection belongs) or about another Collection (meaning that this collection is nested)' })
  parent: TParentObject;

  @Field({ description: "Title of this collection. Isn't unique" })
  title: string;

  @Field({ description: 'Optional description of this collection', nullable: true })
  subtitle?: string;
};