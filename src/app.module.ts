import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Place } from './entities/place.entity';

import * as connectionOptions from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
