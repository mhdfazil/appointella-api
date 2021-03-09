import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Customer } from "src/customer/customer.schema";
import { Service } from "src/service/service.schema";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {

    @Prop({ required:true, type: Types.ObjectId, ref: Customer.name })
    customer: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Service.name })
    service: Types.ObjectId;

    @Prop({ required: true, type: Date, index: true })
    date: Date;

    @Prop({required:true})
    startTime: string;

    @Prop({required:true})
    endTime: string;

    @Prop({ required: true })
    subService: number;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true, enum: ['pending', 'accepted', 'canceled', 'completed'] })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);