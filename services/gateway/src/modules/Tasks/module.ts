import { Module, forwardRef } from '@nestjs/common';
import { BackendConnectionModule, CollectionsModule, SessionModule, TaskSessionModule, UserModule } from '..';

// Importing resolvers and services
import * as Resolvers from './resolvers';
import * as Services from './services';

@Module({
  imports: [BackendConnectionModule, SessionModule, UserModule, forwardRef(() => CollectionsModule), forwardRef(() => TaskSessionModule)],
  providers: [...Object.values(Resolvers), ...Object.values(Services)],
  exports: [...Object.values(Services)]
})
export class TasksModule {};