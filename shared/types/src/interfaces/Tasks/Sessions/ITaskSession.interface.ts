// Importing modules
import { Types } from "mongoose";

// @interface ITaskSession
// - Interface, that describes basic Session of a task.
// Session acts like a small activity timer. It contains
// startDate and endDate of an activity.
export interface ITaskSession {
  _id: Types.ObjectId,

  taskId: Types.ObjectId,

  // Session-related information
  startDate: number,
  endDate?: number,
};