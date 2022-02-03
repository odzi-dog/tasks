// Importing modules
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ITaskSession } from '@shared/types';
import { Document, Types } from 'mongoose';

// Exportng document type
export type TaskSessionDocument = Document & TaskSessionModel;

// Exporting model itself
@Schema()
export class TaskSessionModel implements Omit<ITaskSession, '_id'> {
  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;

  @Prop({ required: true })
  startDate: number;

  @Prop({ required: false })
  endDate?: number;
};

// Exporting schema
export const TaskSessionSchema = SchemaFactory.createForClass(TaskSessionModel);