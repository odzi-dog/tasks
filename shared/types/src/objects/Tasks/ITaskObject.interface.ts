// Importing types
import { Types } from 'mongoose';
import { ITaskSessionObject } from '.';
import { IUserObject, TParentObject } from '..';

// @interface ITaskObject
export interface ITaskObject {
  _id: Types.ObjectId,

  parent: TParentObject,
  
  isTaskPinned: boolean,

  sessions: ITaskSessionObject[];

  icon?: string;
  title: string;
  subtitle?: string;
};