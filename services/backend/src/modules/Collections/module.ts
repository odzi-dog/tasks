import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from '@app/models';
import { TasksModule, UserModule } from '..';

// Importing services and listeners
import * as Listeners from './listeners';
import * as Services from './services';

@Module({
  imports: [
    // Importing CollectionSchema
    MongooseModule.forFeature([
      {
        schema: CollectionSchema,
        name: 'Collection',
      },
    ]),

    // Other modules
    UserModule,
    forwardRef(() => TasksModule),
  ],
  controllers: [...Object.values(Listeners)],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class CollectionsModule {}