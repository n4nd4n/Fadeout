import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemNotificationController } from './system-notification.controller';
import { SystemNotificationService } from './system-notification.service';
import { SystemNotification } from './entities/system-notification.entity';
import { Admin } from '../admin/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemNotification, Admin])],
  controllers: [SystemNotificationController],
  providers: [SystemNotificationService],
  exports: [SystemNotificationService],
})
export class SystemNotificationModule {}
