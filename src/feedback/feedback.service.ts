import { Injectable } from '@nestjs/common';
import { FeedbackDto } from './feedback.dto';

@Injectable()
export class FeedbackService {
  create(createFeedbackDto: FeedbackDto) {
    return 'This action adds a new feedback';
  }

  findAll() {
    return `This action returns all feedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: FeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
