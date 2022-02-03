// Importing modules
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ITask } from '@shared/types';
import { ParentModel, ParentSchema } from '..';

// Exporting document type
export type TaskDocument = Document & TaskModel;

// Exporting model itself
@Schema()
export class TaskModel implements Omit<ITask, '_id'> {
  @Prop({ type: String, required: false, defaultValue: "task" })
  __model: string;
  
  @Prop({ type: ParentSchema, required: true })
  parent: ParentModel;

  @Prop({ required: false, })
  icon?: string;

  @Prop()
  title: string;

  @Prop({ required: false })
  subtitle?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ required: false, defaultValue: false })
  isTaskPinned: boolean;
};

// Exporting schema
export const TaskSchema = SchemaFactory.createForClass(TaskModel);