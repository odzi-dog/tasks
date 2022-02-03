// Importing modules
import { InputType, Field } from '@nestjs/graphql';
import { CreateTaskDTO } from '@shared/types';

// Exporting InputType itself
@InputType()
export class CreateTaskInput implements CreateTaskDTO {
  @Field({ nullable: true })
  icon?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;
};