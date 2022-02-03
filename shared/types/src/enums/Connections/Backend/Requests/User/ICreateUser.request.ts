import { CreateUserDTO } from "../../../../..";

// @interface ICreateUserRequest
export class ICreateUserRequest implements CreateUserDTO {
  email: string;
  username?: string;
};