import { EClientUpdateType } from "..";

export interface IUpdatePayload {
  uid: string,
  type: EClientUpdateType,
  payload?: Object,
};