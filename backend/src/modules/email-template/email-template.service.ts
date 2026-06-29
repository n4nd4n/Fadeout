import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailTemplate } from './entities/email-template.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class EmailTemplateService {
  constructor(
    @InjectRepository(EmailTemplate)
    private emailTemplateRepository: Repository<EmailTemplate>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || '';
    const sortBy = query.sortBy || 'templateId';
    const sortOrder = (query.sortOrder || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const qb = this.emailTemplateRepository.createQueryBuilder('template');

    if (search) {
      qb.where('template.templateId ILIKE :search OR template.templateName ILIKE :search', {
        search: `%${search}%`,
      });
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
      subject: t.subject,
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
    const template = await this.emailTemplateRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Email template not found');
    }

    return {
      id: String(template.id),
      templateId: template.templateId,
      templateName: template.templateName,
      subject: template.subject,
      body: template.body,
      status: template.status,
      lastUpdated: template.updatedAt.toISOString(),
      updatedBy: template.updatedBy || 'System',
    };
  }

  async edit(body: any, userId: number) {
    const { id, templateName, subject, body: emailBody, status } = body;

    if (!id) {
      throw new BadRequestException('Template ID is required');
    }

    const template = await this.emailTemplateRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Email template not found');
    }

    // Get admin details
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can edit email templates');
    }

    if (templateName !== undefined) template.templateName = templateName;
    if (subject !== undefined) template.subject = subject;
    if (emailBody !== undefined) template.body = emailBody;
    if (status !== undefined) {
      if (status !== 'active' && status !== 'inactive') {
        throw new BadRequestException('Invalid status. Allowed values: active, inactive');
      }
      template.status = status;
    }

    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.emailTemplateRepository.save(template);

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

    const template = await this.emailTemplateRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!template) {
      throw new NotFoundException('Email template not found');
    }

    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admins can modify email templates');
    }

    template.status = template.status === 'active' ? 'inactive' : 'active';
    template.updatedBy = admin.fullName;
    template.updatedAt = new Date();

    const saved = await this.emailTemplateRepository.save(template);

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
