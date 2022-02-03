import { Module } from '@nestjs/common';

// Importing gateways and services
import * as Gateways from './gateways';
import * as Services from './services';

@Module({
  providers: [...Object.values(Services), ...Object.values(Gateways)],
  exports: [...Object.values(Services)],
})
export class ClientConnectionModule {};