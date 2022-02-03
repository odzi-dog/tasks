// Importing types
import { Types } from "mongoose";

// @interface IUserObject
export interface IUserObject {
  _id: Types.ObjectId,

  email: string,
  username?: string;
};