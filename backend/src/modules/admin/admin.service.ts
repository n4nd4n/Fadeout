import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findById(id: number) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      return null;
    }

    return {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      status: admin.status,
      createdAt: admin.createdAt,
    };
  }

  async findByEmail(email: string) {
    return this.adminRepository.findOne({
      where: { email },
    });
  }

  async updateProfile(id: number, updateData: { fullName?: string }) {
    await this.adminRepository.update(id, updateData);
    return this.findById(id);
  }

  async changePassword(id: number, newPassword: string) {
    await this.adminRepository.update(id, { password: newPassword });
    return { message: 'Password changed successfully' };
  }
}
