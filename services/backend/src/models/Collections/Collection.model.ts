// Importing modules
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ICollection } from '@shared/types';
import { ParentModel, ParentSchema } from '..';

// Exporting document
export type CollectionDocument = Document & CollectionModel;

// Exporting model
@Schema()
export class CollectionModel implements Omit<ICollection, '_id'> {
  @Prop({ type: String, required: false, defaultValue: "collection" })
  __model: string;

  @Prop({ type: ParentSchema, required: true })
  parent: ParentModel;

  // Visuals
  @Prop({ required: false })
  icon?: string;

  @Prop()
  title: string;
  
  @Prop({ required: false })
  subtitle?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ required: false, defaultValue: false })
  isCollectionPinned: boolean;
};

// And schema itself
export const CollectionSchema = SchemaFactory.createForClass(CollectionModel);