// Importing modules
import { InputType, Field } from '@nestjs/graphql';
import { FilterTaskServiceDTO } from '@shared/types';

// Exporting input object
@InputType()
export class FilterTaskSessionInput implements FilterTaskServiceDTO {
  @Field({ description: "Filters all sessions, that have one or more occurances in this date's day (through 00:00 - 23:59)", nullable: true })
  startDate?: number;
};