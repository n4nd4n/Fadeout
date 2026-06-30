import { Controller, Get, Post, Body, Query, Param, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('api/push-notification')
export class PushNotificationController {
  constructor(private readonly pushNotificationService: PushNotificationService) {}

  @Get()
  @Public()
  async getList(@Query() query: any, @Res() res: Response) {
    try {
      const result = await this.pushNotificationService.findAll(query);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Push notifications retrieved successfully',
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Get('detail/:id')
  @Public()
  async getDetail(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.pushNotificationService.findDetail(id);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Push notification details retrieved successfully',
        data: result,
        meta: {},
      });
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard)
  async editTemplate(
    @Body() body: any,
    @GetUser('userId') userId: number,
    @Res() res: Response,
  ) {
    try {
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const result = await this.pushNotificationService.edit(body, userId);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Push notification updated successfully',
        data: result,
      });
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Post('toggle/:id')
  @UseGuards(JwtAuthGuard)
  async toggleStatus(
    @Param('id') id: string,
    @GetUser('userId') userId: number,
    @Res() res: Response,
  ) {
    try {
      if (!userId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const result = await this.pushNotificationService.toggleStatus(id, userId);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Push notification status toggled successfully',
        data: result,
      });
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }
}
