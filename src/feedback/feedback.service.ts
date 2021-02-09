import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackDto } from './feedback.dto';
import { Feedback, FeedbackDocument } from './feedback.schema';

@Injectable()
export class FeedbackService {
  constructor( @InjectModel(Feedback.name) private readonly FeedbackModel: Model<FeedbackDocument> ) {}

  async create(feedbackDto: FeedbackDto) {
    const feedback = new this.FeedbackModel(feedbackDto);
    return await feedback.save();
  }

  async findAll() {
    return this.FeedbackModel.find();
  }

  async findOne(id: string) {
    return this.FeedbackModel.findOne({ _id: id });
  }

  async update(id: string, feedback: Feedback) {
    return await this.FeedbackModel.findByIdAndUpdate(id, feedback, { new: true });
  }

  async remove(id: string) {
    return await this.FeedbackModel.findByIdAndRemove(id);
  }
}
