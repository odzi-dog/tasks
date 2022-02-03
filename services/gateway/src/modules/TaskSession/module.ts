import { forwardRef, Module } from '@nestjs/common';
import { BackendConnectionModule } from '@app/modules/BackendConnection/module';
import { SessionModule } from '@app/modules/Session/module';
import { TasksModule } from '@app/modules/Tasks/module';

// Importing services and resolvers
import * as Resolvers from './resolvers';
import * as Services from './services';

@Module({
  imports: [BackendConnectionModule, SessionModule, forwardRef(() => TasksModule)],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)]
})
export class TaskSessionModule {};