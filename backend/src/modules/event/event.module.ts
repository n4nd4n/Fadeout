import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventParticipant } from './entities/event-participant.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventParticipant]),
    UserModule,
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService, TypeOrmModule],
})
export class EventModule {}
