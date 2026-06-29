import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminSeed } from './admin.seed';
import { DataSeed } from './data.seed';

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
