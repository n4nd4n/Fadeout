import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushNotification } from './entities/push-notification.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushNotification)
    private pushNotificationRepository: Repository<PushNotification>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || '';
    const sortBy = query.sortBy || 'templateId';
    const sortOrder = (query.sortOrder || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const qb = this.pushNotificationRepository.createQueryBuilder('template');

    if (search) {
      qb.where(
        'template.templateId ILIKE :search OR template.templateName ILIKE :search',
        { search: `%${search}%` },
      );
    }

    // Map sortBy to columns
    let orderColumn = 'template.templateId';
    if (sortBy === 'lastUpdated' || sortBy === 'updatedAt') {
      orderColumn = 'template.updatedAt';
    } else if (sortBy === 'templateName') {
      orderColumn = 'template.templateName';
    } else if (sortBy === 'templateId') {
      orderColumn = 'template.templateId';
    } else if (sortBy === 'status') {
      orderColumn = 'template.status';
    }

    qb.orderBy(orderColumn, sortOrder);

    const total = await qb.getCount();
    const records = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const data = records.map(t => ({
      id: String(t.id),
      templateId: t.templateId,
      templateName: t.templateName,
      body: t.body,
      lastUpdated: t.updatedAt.toISOString(),
      updatedBy: t.updatedBy || 'System',
      status: t.status,
    }));

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findDetail(id: string) {
    const template = await this.pushNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Push notification template not found');
    }

    return {
      id: String(template.id),
      templateId: template.templateId,
      templateName: template.templateName,
      body: template.body,
      status: template.status,
      lastUpdated: template.updatedAt.toISOString(),
      updatedBy: template.updatedBy || 'System',
    };
  }

  async edit(body: any, userId: number) {
    const { id, templateName, body: templateBody, status } = body;

    if (!id) {
      throw new BadRequestException('Template ID is required');
    }

    const template = await this.pushNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Push notification template not found');
    }

    // Get admin details
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can edit push notification templates');
    }

    if (templateName !== undefined) template.templateName = templateName;
    if (templateBody !== undefined) template.body = templateBody;
    if (status !== undefined) {
      if (status !== 'active' && status !== 'inactive') {
        throw new BadRequestException('Invalid status. Allowed values: active, inactive');
      }
      template.status = status;
    }

    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.pushNotificationRepository.save(template);

    return {
      id: String(saved.id),
      templateId: saved.templateId,
      templateName: saved.templateName,
      status: saved.status,
      lastUpdated: saved.updatedAt.toISOString(),
      updatedBy: saved.updatedBy,
    };
  }

  async toggleStatus(id: string, userId: number) {
    if (!id) {
      throw new BadRequestException('Template ID is required');
    }

    const template = await this.pushNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Push notification template not found');
    }

    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can modify push notification templates');
    }

    template.status = template.status === 'active' ? 'inactive' : 'active';
    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.pushNotificationRepository.save(template);

    return {
      id: String(saved.id),
      templateId: saved.templateId,
      templateName: saved.templateName,
      status: saved.status,
      lastUpdated: saved.updatedAt.toISOString(),
      updatedBy: saved.updatedBy,
    };
  }
}
