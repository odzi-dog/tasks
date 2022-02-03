import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/Application/module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  
  // Connection microservice
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.REDIS,
      options: {
        // process.env.REDIS_URL
        host: 'redis-12910.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
        port: Number(12910),
        password: 'VUmRfSOGM3GWsawbkZ1GmDrdPMtjI0mk'
      }
    },
  );

  // Starting all microservices and application itself
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
