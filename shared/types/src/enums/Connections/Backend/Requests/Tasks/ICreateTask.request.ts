// Importing types/modules
import { CreateTaskDTO } from "../../../../..";

// @interface CreateTaskRequest
// - Contains all needed information, that we
// need to send to backend to create new task
// and assign it to collection/user
export interface ICreateTaskRequest {
  userId: string;
  task: CreateTaskDTO,
  collectionId?: string;
  taskId?: string;
};