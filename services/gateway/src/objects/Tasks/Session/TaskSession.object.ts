// Importing modules
import { ObjectType, Field } from '@nestjs/graphql';
import { ITaskSessionObject, ITaskObject } from '@shared/types';
import { Types } from 'mongoose';
import { TaskObject } from '..';

// Exporting object
@ObjectType('TaskSession')
export class TaskSessionObject implements ITaskSessionObject {
  @Field(type => String, { description: 'System id of this session' })
  _id: Types.ObjectId;

  @Field(type => TaskObject, { description: 'Task, that is assigned to this session', nullable: true })
  task: ITaskObject;
  
  @Field({ description: 'Start date of this session (utc, unix)' })
  startDate: number;
  
  @Field({ description: 'End date of this session (utc, unix)', nullable: true })
  endDate?: number;
};