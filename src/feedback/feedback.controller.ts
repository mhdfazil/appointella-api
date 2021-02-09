import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FeedbackDto } from './feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() feedbackDto: FeedbackDto) {
    return this.feedbackService.create(feedbackDto);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() feedbackDto: any) {
    return this.feedbackService.update(id, feedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
