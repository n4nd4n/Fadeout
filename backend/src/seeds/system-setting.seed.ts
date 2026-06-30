import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from '../modules/system-setting/entities/system-setting.entity';

@Injectable()
export class SystemSettingSeed {
  constructor(
    @InjectRepository(SystemSetting)
    private readonly systemSettingRepository: Repository<SystemSetting>,
  ) {}

  async seed() {
    console.log('🌱 Starting System Settings Seeder...');

    const existing = await this.systemSettingRepository.find();
    if (existing.length > 0) {
      console.log('✅ System Settings already seeded, skipping.');
      return;
    }

    const defaultSettings = this.systemSettingRepository.create({
      companyName: 'Fadeout Admin Platform',
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 30,
      copyrightText: '© 2026 Fadeout Admin. All rights reserved.',
      androidAppVersion: '1.0.0',
      androidForceUpdate: false,
      iosAppVersion: '1.0.0',
      iosForceUpdate: false,
      logoPath: 'https://api-fadeout-dev.projectspreview.net/uploads/system-settings/logo/Fadeout_logo-1773734229899-n2ox9tdm-1781509051916-4qhdcury.png',
      faviconPath: 'https://api-fadeout-dev.projectspreview.net/uploads/system-settings/favicon/image-20-1773734784002-dn6kz40y.png',
    });

    await this.systemSettingRepository.save(defaultSettings);
    console.log('✅ Default System Settings seeded successfully.');
  }
}
