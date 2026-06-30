import { Controller, Get, Post, Body, HttpStatus, Res, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SystemSettingService } from './system-setting.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/system-setting')
export class SystemSettingController {
  constructor(private readonly systemSettingService: SystemSettingService) {}

  @Get()
  @Public()
  async getSettings(@Res() res: Response) {
    try {
      const result = await this.systemSettingService.getSettings();
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'System settings retrieved successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'favicon', maxCount: 1 },
    ]),
  )
  async editSettings(
    @Body() body: any,
    @UploadedFiles() files: any,
    @Res() res: Response,
  ) {
    try {
      const logoFile = files?.logo ? files.logo[0] : undefined;
      const faviconFile = files?.favicon ? files.favicon[0] : undefined;

      const result = await this.systemSettingService.updateSettings(body, logoFile, faviconFile);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'System settings updated successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }
}
