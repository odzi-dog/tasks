import { Types } from 'mongoose';

// @interface FetchUserById
export interface IFetchUserByIdRequest {
  id: string | Types.ObjectId,
};

// @interface FetchUserByEmail
export interface IFetchUserByEmailRequest {
  email: string,
};

// @interface FetchUserByToken
export interface IFetchUserByTokenRequest {
  token: string,
};

// @interface IFetchOneUserRequest
export type IFetchOneUserRequest = IFetchUserByIdRequest | IFetchUserByEmailRequest | IFetchUserByTokenRequest;