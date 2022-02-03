// Importing modules
import { Field, InputType } from '@nestjs/graphql';
import { CreateCollectionDTO } from '@shared/types';

// Exporting CreateCollection input
@InputType()
export class CreateCollectionInput implements CreateCollectionDTO {
  @Field()
  title: string;
  
  @Field({ nullable: true })
  subtitle?: string;
};