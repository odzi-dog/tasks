// Importing modules
import { Types } from "mongoose";
import { IParent } from "..";

// @interface ICollection
// - Basid collection information
export interface ICollection {
  _id: Types.ObjectId,
  __model: string,

  // Parent for root collections/tasks
  // is user.
  parent: IParent,

  // Visual information
  icon?: string,

  title: string,
  subtitle?: string,

  // Other properties
  ownerId: Types.ObjectId,
  isCollectionPinned: boolean,

  // +todo color
};