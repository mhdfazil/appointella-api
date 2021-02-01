import { Types } from "mongoose";

export class FeedbackDto {
    readonly appointment: Types.ObjectId;
    readonly rating: Types.ObjectId;
    readonly description: number;
    readonly deleted: boolean;
}