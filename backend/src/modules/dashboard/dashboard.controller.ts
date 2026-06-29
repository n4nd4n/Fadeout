import { Controller, Get, Query, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  async getStats(@Query('dateRange') dateRange: string, @Res() res: Response) {
    try {
      const stats = await this.dashboardService.getStats(dateRange || 'all');
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Dashboard statistics retrieved successfully',
        data: stats,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }
}
