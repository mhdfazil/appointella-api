import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Appointment } from "src/appointment/appointment.schema";

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {

    @Prop({ required: true, type: Types.ObjectId, ref: Appointment.name })
    appointment: Appointment;

    @Prop({ required:true })
    rating: number;

    @Prop()
    description: string;

    @Prop({ default: false })
    deleted: boolean;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);