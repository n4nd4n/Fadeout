import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('profile')
  async getProfile(@GetUser('userId') userId: number) {
    return this.adminService.findById(userId);
  }

  @Put('profile')
  async updateProfile(
    @GetUser('userId') userId: number,
    @Body() updateData: { fullName?: string },
  ) {
    return this.adminService.updateProfile(userId, updateData);
  }

  @Put('change-password')
  async changePassword(
    @GetUser('userId') userId: number,
    @Body() body: { newPassword: string },
  ) {
    return this.adminService.changePassword(userId, body.newPassword);
  }
}
