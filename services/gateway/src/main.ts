import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/Application/module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  // Connecting microservice
  // app.connectMicroservice(<MicroserviceOptions>{
  //   transport: Transport.REDIS,
  //   options: {
  //     url: process.env.REDIS_URL,
  //   },
  // });

  // Session
  app.use(
    session({
      secret: 'yeah',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3001);
}
bootstrap();
