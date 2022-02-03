import { Module } from '@nestjs/common';
import { TaskSessionSchema } from '@app/models';
import { MongooseModule } from '@nestjs/mongoose';

// Importing services and resolvers
import * as Listeners from './listeners';
import * as Services from './services';

// Exporting module itself
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TaskSession',
        schema: TaskSessionSchema,
      }
    ]),
  ],
  controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class TaskSessionModule {};