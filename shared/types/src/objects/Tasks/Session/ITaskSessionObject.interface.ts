import { Types } from 'mongoose';
import { ITaskObject } from '..';

// Exporting interface
export interface ITaskSessionObject {
  _id: Types.ObjectId,

  task: ITaskObject,

  startDate: number,
  endDate?: number,
};