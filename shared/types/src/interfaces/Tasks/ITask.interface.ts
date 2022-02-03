// Importing modules
import { IParent } from '..';
import { Types } from 'mongoose';

// @interface ITask
// @warning ./backend/types/interfaces/Tasks/ITaskModel.interface
// contains information about backend's TaskModel.
// - Contains basic information about particular task
export interface ITask {
  _id: Types.ObjectId,
  __model: string,

  // Task can be assigned either to collection
  // or to user. Or to another task.
  parent: IParent,

  // Visual information
  icon?: string,

  title: string,
  subtitle?: string,

  // Other properties
  ownerId: Types.ObjectId,
  isTaskPinned: boolean,
};