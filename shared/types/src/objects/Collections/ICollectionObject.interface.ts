// Importing types
import { Types } from 'mongoose'
import { ITaskObject, TParentObject } from '..';

// @interface ICollectionObject
export interface ICollectionObject {
  _id: Types.ObjectId,

  parent: TParentObject,

  // Collection tasks
  tasks: ITaskObject[],

  icon?: string,
  title: string,
  subtitle?: string,

  isCollectionPinned: boolean,
};