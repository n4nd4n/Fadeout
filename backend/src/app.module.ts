import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { SeedModule } from './seeds/seed.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { StaticPageModule } from './modules/static-page/static-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'auth_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      // Schema is managed by migrations, not auto-sync. Pending migrations are
      // applied automatically on startup.
      synchronize: false,
      migrationsRun: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    AdminModule,
    SeedModule,
    UserModule,
    EventModule,
    DashboardModule,
    StaticPageModule,
  ],
})
export class AppModule {}
