import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Appointment } from "src/appointment/appointment.schema";

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {

    @Prop({ required:true, type: Types.ObjectId, ref: Appointment.name })
    appointment: Types.ObjectId;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    status: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);