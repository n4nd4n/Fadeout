import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSetting } from './entities/system-setting.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SystemSettingService {
  constructor(
    @InjectRepository(SystemSetting)
    private readonly systemSettingRepository: Repository<SystemSetting>,
  ) {}

  async getSettings(): Promise<SystemSetting> {
    const settings = await this.systemSettingRepository.find();
    if (settings.length === 0) {
      // Create a default settings record
      const defaultSettings = this.systemSettingRepository.create({
        companyName: 'Fadeout',
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
      return this.systemSettingRepository.save(defaultSettings);
    }
    return settings[0];
  }

  async updateSettings(
    body: any,
    logoFile?: any,
    faviconFile?: any,
  ): Promise<SystemSetting> {
    const settings = await this.getSettings();

    // Parse values
    if (body.companyName !== undefined) settings.companyName = body.companyName;
    if (body.maxLoginAttempts !== undefined) settings.maxLoginAttempts = parseInt(body.maxLoginAttempts, 10);
    if (body.sessionTimeoutMinutes !== undefined) settings.sessionTimeoutMinutes = parseInt(body.sessionTimeoutMinutes, 10);
    if (body.copyrightText !== undefined) settings.copyrightText = body.copyrightText;
    if (body.androidAppVersion !== undefined) settings.androidAppVersion = body.androidAppVersion;
    if (body.androidForceUpdate !== undefined) {
      settings.androidForceUpdate = body.androidForceUpdate === 'true' || body.androidForceUpdate === true;
    }
    if (body.iosAppVersion !== undefined) settings.iosAppVersion = body.iosAppVersion;
    if (body.iosForceUpdate !== undefined) {
      settings.iosForceUpdate = body.iosForceUpdate === 'true' || body.iosForceUpdate === true;
    }

    // Handle files
    if (logoFile) {
      settings.logoPath = this.saveUploadedFile(logoFile, 'logo');
    }
    if (faviconFile) {
      settings.faviconPath = this.saveUploadedFile(faviconFile, 'favicon');
    }

    settings.updatedAt = new Date();
    return this.systemSettingRepository.save(settings);
  }

  private saveUploadedFile(file: any, type: 'logo' | 'favicon'): string {
    const uploadDir = path.resolve(process.cwd(), 'uploads', 'system-settings', type);
    fs.mkdirSync(uploadDir, { recursive: true });

    const ext = path.extname(file.originalname);
    const fileName = `${type}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    return `/uploads/system-settings/${type}/${fileName}`;
  }
}
