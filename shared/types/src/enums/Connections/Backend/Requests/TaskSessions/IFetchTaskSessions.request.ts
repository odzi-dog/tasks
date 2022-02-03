// Importing types
import { FilterTaskServiceDTO } from '../../../../../';

// Exporting interface
export interface IFetchTaskSessionRequest {
  taskId: string,
  filter?: FilterTaskServiceDTO,
};