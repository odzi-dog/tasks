import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models';

// Importing modules
import * as Modules from '../index';

@Module({
  imports: [
    // Nest-modules
    ConfigModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URL),
    
    // Application modules
    ...Object.values(Modules),
  ]
})
export class ApplicationModule {};