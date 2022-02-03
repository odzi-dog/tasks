// Importing modules
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '@shared/types';
import { Document } from 'mongoose';

// Exporting User document type
export type UserDocument = Document & UserModel;

// Exporting User model
@Schema()
export class UserModel implements Omit<IUser, '_id'> {
  @Prop({ type: String, required: false, defaultValue: "user" })
  __model: string;
  
  @Prop({ required: false, })
  username?: string;

  @Prop({ required: true, unique: true })
  email: string;
};

// Exporting schema itself
export const UserSchema = SchemaFactory.createForClass(UserModel);