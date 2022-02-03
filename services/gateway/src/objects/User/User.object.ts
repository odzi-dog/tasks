// Importing types and modules
import { IUserObject } from '@shared/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType('User', {
  description: 'Basic user object, that consists of all user information'
})
export class UserObject implements IUserObject {
  @Field(type => String, { nullable: false })
  _id: Types.ObjectId

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false, defaultValue: 'Default user' })
  username?: string;
};