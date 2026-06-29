import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../modules/admin/entities/admin.entity';

@Injectable()
export class AdminSeed {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async seed() {
    console.log('🌱 Starting Admin Seeder...');

    const DEFAULT_ADMIN = {
      fullName: 'HB Admin',
      email: 'admin@fadeout.com',
      password: 'Admin@123',
      role: 'Super Admin',
      status: 'Active',
    };

    // Check if admin already exists
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: DEFAULT_ADMIN.email },
    });

    if (existingAdmin) {
      console.log('✅ Admin already exists, skipping seed');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);

    // Create the admin
    const admin = this.adminRepository.create({
      fullName: DEFAULT_ADMIN.fullName,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      role: DEFAULT_ADMIN.role,
      status: DEFAULT_ADMIN.status,
    });

    await this.adminRepository.save(admin);

    console.log('✅ Default admin created successfully');
    console.log(`   Email: ${DEFAULT_ADMIN.email}`);
    console.log(`   Password: ${DEFAULT_ADMIN.password}`);
    console.log(`   Role: ${DEFAULT_ADMIN.role}`);
  }
}
