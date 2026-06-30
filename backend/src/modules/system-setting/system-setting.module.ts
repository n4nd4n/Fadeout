import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemSetting } from './entities/system-setting.entity';
import { SystemSettingService } from './system-setting.service';
import { SystemSettingController } from './system-setting.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemSetting])],
  providers: [SystemSettingService],
  controllers: [SystemSettingController],
  exports: [SystemSettingService],
})
export class SystemSettingModule {}
