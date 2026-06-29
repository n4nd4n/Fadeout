import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticPageController } from './static-page.controller';
import { StaticPageService } from './static-page.service';
import { StaticPage } from './entities/static-page.entity';
import { Admin } from '../admin/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaticPage, Admin])],
  controllers: [StaticPageController],
  providers: [StaticPageService],
  exports: [StaticPageService],
})
export class StaticPageModule {}
