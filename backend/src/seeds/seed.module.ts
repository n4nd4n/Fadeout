import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSeed } from './admin.seed';
import { DataSeed } from './data.seed';
import { Admin } from '../modules/admin/entities/admin.entity';
import { User } from '../modules/user/entities/user.entity';
import { Event } from '../modules/event/entities/event.entity';
import { EventParticipant } from '../modules/event/entities/event-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, Event, EventParticipant])],
  providers: [AdminSeed, DataSeed],
  exports: [AdminSeed, DataSeed],
})
export class SeedModule {}
