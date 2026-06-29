import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticPage } from './entities/static-page.entity';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class StaticPageService {
  constructor(
    @InjectRepository(StaticPage)
    private staticPageRepository: Repository<StaticPage>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const search = query.search || '';
    const sortBy = query.sortBy || 'pageName';
    const sortOrder = (query.sortOrder || 'asc').toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const qb = this.staticPageRepository.createQueryBuilder('page');

    if (search) {
      qb.where('page.pageName ILIKE :search OR page.slug ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Map sortBy to columns
    let orderColumn = 'page.pageName';
    if (sortBy === 'lastUpdated') {
      orderColumn = 'page.updatedAt';
    } else if (sortBy === 'updatedBy') {
      orderColumn = 'page.updatedBy';
    } else if (sortBy === 'status') {
      orderColumn = 'page.status';
    } else if (sortBy === 'pageName') {
      orderColumn = 'page.pageName';
    }

    qb.orderBy(orderColumn, sortOrder);

    const total = await qb.getCount();
    const records = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const data = records.map(p => ({
      pageId: String(p.id),
      pageName: p.pageName,
      lastUpdated: p.updatedAt.toISOString(),
      updatedBy: p.updatedBy || 'System',
      status: p.status,
      code: p.slug,
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

  async findDetail(idOrSlug: string) {
    let page: StaticPage | null = null;
    if (/^\d+$/.test(idOrSlug)) {
      page = await this.staticPageRepository.findOne({
        where: { id: parseInt(idOrSlug, 10) },
      });
    } else {
      page = await this.staticPageRepository.findOne({
        where: { slug: idOrSlug },
      });
    }

    if (!page) {
      throw new NotFoundException('Static page not found');
    }

    return {
      pageId: String(page.id),
      pageName: page.pageName,
      slug: page.slug,
      content: page.content,
      status: page.status,
      lastUpdated: page.updatedAt.toISOString(),
      updatedBy: page.updatedBy || 'System',
    };
  }

  async edit(body: any, userId: number) {
    const { pageId, content, status } = body;

    if (!pageId) {
      throw new BadRequestException('Page ID is required');
    }
    if (!content) {
      throw new BadRequestException('Content is required');
    }

    if (status && status !== 'active' && status !== 'inactive') {
      throw new BadRequestException('Invalid status value. Allowed values: active, inactive');
    }

    const page = await this.staticPageRepository.findOne({
      where: { id: parseInt(pageId, 10) },
    });

    if (!page) {
      throw new NotFoundException('Static page not found');
    }

    // Get admin details
    const admin = await this.adminRepository.findOne({
      where: { id: userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Only admin can edit static pages');
    }

    page.content = content;
    if (status) {
      page.status = status;
    }
    page.updatedBy = admin.fullName;
    page.updatedAt = new Date();

    const saved = await this.staticPageRepository.save(page);

    return {
      pageId: String(saved.id),
      pageName: saved.pageName,
      status: saved.status,
      lastUpdated: saved.updatedAt.toISOString(),
      updatedBy: saved.updatedBy,
    };
  }
}
