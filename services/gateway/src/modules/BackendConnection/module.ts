import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

import * as Services from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'BACKEND_CONNECTION',
        transport: Transport.REDIS,
        options: {
          host: 'redis-12910.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
          port: Number(12910),
          password: 'VUmRfSOGM3GWsawbkZ1GmDrdPMtjI0mk'
        },
      },
    ]),
  ],
  providers: [...Object.values(Services)],
  exports: [...Object.values(Services)],
})
export class BackendConnectionModule {};