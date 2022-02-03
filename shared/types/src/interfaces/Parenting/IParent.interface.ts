// Importing types
import { EParentType } from '../..';
import { Types } from 'mongoose';

// @interface IParent
export interface IParent {
  type: EParentType,
  id: Types.ObjectId,
};