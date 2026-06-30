import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminSeed } from './admin.seed';
import { DataSeed } from './data.seed';
import { EmailTemplateSeed } from './email-template.seed';
import { SystemNotificationSeed } from './system-notification.seed';
import { PushNotificationSeed } from './push-notification.seed';
import { SystemSettingSeed } from './system-setting.seed';

async function bootstrap() {
  console.log('🚀 Starting Seed Process...');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get the AdminSeed service
    const adminSeed = app.get(AdminSeed);
    // Run admin seed
    await adminSeed.seed();

    // Get the DataSeed service
    const dataSeed = app.get(DataSeed);
    // Run data seed
    await dataSeed.seed();

    // Get the EmailTemplateSeed service
    const emailTemplateSeed = app.get(EmailTemplateSeed);
    // Run email template seed
    await emailTemplateSeed.seed();

    // Get SystemNotificationSeed service
    const systemNotificationSeed = app.get(SystemNotificationSeed);
    // Run system notification seed
    await systemNotificationSeed.seed();

    // Get PushNotificationSeed service
    const pushNotificationSeed = app.get(PushNotificationSeed);
    // Run push notification seed
    await pushNotificationSeed.seed();

    // Get SystemSettingSeed service
    const systemSettingSeed = app.get(SystemSettingSeed);
    // Run system setting seed
    await systemSettingSeed.seed();

    console.log('✅ All seeds completed successfully');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();

