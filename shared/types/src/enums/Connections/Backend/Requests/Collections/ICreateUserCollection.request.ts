// Importing types
import { CreateCollectionDTO } from "../../../../..";

// @interface CreateUserCollectionRequest
// - Request to create a {collection} for user
// with {id}
export interface ICreateUserCollectionRequest {
  id: string,
  collection: CreateCollectionDTO,
};