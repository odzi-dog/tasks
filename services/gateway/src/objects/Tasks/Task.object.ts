// Importing modules
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ParentUnion } from '@app/unions';
import { ITaskObject, TParentObject, IParent, ITaskSessionObject } from '@shared/types';
import { TaskSessionObject } from '.';

// Exporting object
@ObjectType('Task')
export class TaskObject implements ITaskObject {
  @Field(type => String, { description: "Entity's system id" })
  _id: Types.ObjectId;

  // Parent
  @Field(type => ParentUnion, { description: 'Parent entity can hold information about User (to which this collection belongs) or about another Collection (meaning that this collection is nested)' })
  parent: TParentObject;

  @Field({ description: "Determines whatever is this task is pinned or not", defaultValue: false })
  isTaskPinned: boolean;

  @Field(type => TaskSessionObject, { description: "This task's sessions" })
  sessions: ITaskSessionObject[];

  @Field({ nullable: true, description: 'Optional task icon. Can be a plain Unicode emoji' })
  icon?: string;

  @Field({ description: 'Required task title' })
  title: string;
  
  @Field({ nullable: true, description: 'Optional task subtitle (Description)' })
  subtitle?: string;
};