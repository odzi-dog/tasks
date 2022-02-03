import { Module, forwardRef } from '@nestjs/common';
import { BackendConnectionModule, SessionModule, TasksModule } from '..';

// Importing resolvers and services
import * as Resolvers from './resolvers';
import * as Services from './services';

@Module({
  imports: [BackendConnectionModule, SessionModule, forwardRef(() => TasksModule)],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)],
})
export class CollectionsModule {};