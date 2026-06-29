import { Controller, Get, Param, Query, HttpStatus, Res } from '@nestjs/common';
import { EventService } from './event.service';
import { Response } from 'express';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('list')
  async getEvents(@Query() query: any, @Res() res: Response) {
    try {
      const result = await this.eventService.findAll(query);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Events retrieved successfully',
        data: result.records,
        pagination: result.pagination,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    }
  }

  @Get('detail/:eventId')
  async getEventDetail(@Param('eventId') eventId: string, @Res() res: Response) {
    try {
      const result = await this.eventService.findDetail(eventId);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Event details retrieved successfully',
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
