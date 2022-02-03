import { Module } from '@nestjs/common';
import { BackendConnectionModule } from '..';

// Importing services and resolvers
import * as Services from './services';
import * as Resolvers from './resolvers';

@Module({
  imports: [BackendConnectionModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services),]
})
export class UserModule {};