import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemNotification } from './entities/system-notification.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class SystemNotificationService {
  constructor(
    @InjectRepository(SystemNotification)
    private systemNotificationRepository: Repository<SystemNotification>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || '';
    const sortBy = query.sortBy || 'templateId';
    const sortOrder = (query.sortOrder || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const qb = this.systemNotificationRepository.createQueryBuilder('template');

    if (search) {
      qb.where(
        'template.templateId ILIKE :search OR template.templateCode ILIKE :search OR template.templateTitle ILIKE :search',
        { search: `%${search}%` },
      );
    }

    // Map sortBy to columns
    let orderColumn = 'template.templateId';
    if (sortBy === 'lastUpdated' || sortBy === 'updatedAt') {
      orderColumn = 'template.updatedAt';
    } else if (sortBy === 'templateCode') {
      orderColumn = 'template.templateCode';
    } else if (sortBy === 'templateTitle') {
      orderColumn = 'template.templateTitle';
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
      templateCode: t.templateCode,
      templateTitle: t.templateTitle,
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
    const template = await this.systemNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('System notification template not found');
    }

    return {
      id: String(template.id),
      templateId: template.templateId,
      templateCode: template.templateCode,
      templateTitle: template.templateTitle,
      body: template.body,
      status: template.status,
      lastUpdated: template.updatedAt.toISOString(),
      updatedBy: template.updatedBy || 'System',
    };
  }

  async edit(body: any, userId: number) {
    const { id, templateTitle, body: templateBody, status } = body;

    if (!id) {
      throw new BadRequestException('Template ID is required');
    }

    const template = await this.systemNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('System notification template not found');
    }

    // Get admin details
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can edit system notification templates');
    }

    if (templateTitle !== undefined) template.templateTitle = templateTitle;
    if (templateBody !== undefined) template.body = templateBody;
    if (status !== undefined) {
      if (status !== 'active' && status !== 'inactive') {
        throw new BadRequestException('Invalid status. Allowed values: active, inactive');
      }
      template.status = status;
    }

    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.systemNotificationRepository.save(template);

    return {
      id: String(saved.id),
      templateId: saved.templateId,
      templateCode: saved.templateCode,
      templateTitle: saved.templateTitle,
      status: saved.status,
      lastUpdated: saved.updatedAt.toISOString(),
      updatedBy: saved.updatedBy,
    };
  }

  async toggleStatus(id: string, userId: number) {
    if (!id) {
      throw new BadRequestException('Template ID is required');
    }

    const template = await this.systemNotificationRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('System notification template not found');
    }

    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can modify system notification templates');
    }

    template.status = template.status === 'active' ? 'inactive' : 'active';
    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.systemNotificationRepository.save(template);

    return {
      id: String(saved.id),
      templateId: saved.templateId,
      templateCode: saved.templateCode,
      templateTitle: saved.templateTitle,
      status: saved.status,
      lastUpdated: saved.updatedAt.toISOString(),
      updatedBy: saved.updatedBy,
    };
  }
}
