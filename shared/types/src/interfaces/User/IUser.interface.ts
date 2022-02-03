import { Types } from "mongoose";

// @interface IUser
// - Main user interface. Contains user's username
// email and other information about user model
export interface IUser {
  _id: Types.ObjectId,
  __model: string,

  username?: string,
  email: string,
};