import { Module } from '@nestjs/common';
import { UserModule } from '..';

// Importing services and resolvers
import * as Services from './services';
import * as Resolvers from './resolvers';

@Module({
  imports: [UserModule],
  providers: [...Object.values(Services), ...Object.values(Resolvers)],
  exports: [...Object.values(Services)]
})
export class SessionModule {};