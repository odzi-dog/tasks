// Importing modules
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IParent, EParentType } from '@shared/types';

// Exporting document type
export type ParentDocument = Document & ParentModel;

// Exporting model
@Schema()
export class ParentModel implements Omit<IParent, '_id'> {
  @Prop({ type: String, enum: Object.values(EParentType), required: true })
  type: EParentType;

  @Prop({ type: Types.ObjectId, required: true })
  id: Types.ObjectId;
};

// And schema
export const ParentSchema = SchemaFactory.createForClass(ParentModel);