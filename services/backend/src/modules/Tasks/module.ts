import { TaskSchema } from '@app/models';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsModule } from '..';

// Importing controllers and services
import * as Listeners from './listeners';
import * as Services from './services';

@Module({
  imports: [
    // Mongoose schema
    MongooseModule.forFeature([
      {
        schema: TaskSchema,
        name: 'Task'
      }
    ]),

    // Other modules
    forwardRef(() => CollectionsModule),
  ],

  controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)]
})
export class TasksModule {};