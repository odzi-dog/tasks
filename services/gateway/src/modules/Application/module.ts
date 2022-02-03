import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Importing all modules
import * as Modules from '../index';

@Module({
  imports: [
    // Other Modules
    ...Object.values(Modules),

    // Nest-Modules
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),

    // GraphlQL configuration
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? 'https://tasks.odzi.dog'
            : 'http://localhost:3000',
        credentials: true,
      },
    }),
  ],
})
export class ApplicationModule {};