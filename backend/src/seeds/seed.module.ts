import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSeed } from './admin.seed';
import { DataSeed } from './data.seed';
import { EmailTemplateSeed } from './email-template.seed';
import { SystemNotificationSeed } from './system-notification.seed';
import { PushNotificationSeed } from './push-notification.seed';
import { Admin } from '../modules/admin/entities/admin.entity';
import { User } from '../modules/user/entities/user.entity';
import { Event } from '../modules/event/entities/event.entity';
import { EventParticipant } from '../modules/event/entities/event-participant.entity';
import { EmailTemplate } from '../modules/email-template/entities/email-template.entity';
import { SystemNotification } from '../modules/system-notification/entities/system-notification.entity';
import { PushNotification } from '../modules/push-notification/entities/push-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User, Event, EventParticipant, EmailTemplate, SystemNotification, PushNotification])],
  providers: [AdminSeed, DataSeed, EmailTemplateSeed, SystemNotificationSeed, PushNotificationSeed],
  exports: [AdminSeed, DataSeed, EmailTemplateSeed, SystemNotificationSeed, PushNotificationSeed],
})
export class SeedModule {}

