import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Service } from "src/service/service.schema";
import { Customer } from "src/customer/customer.schema";
import { Merchant } from "src/merchant/merchant.schema";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {

    @Prop({ required:true, type: Types.ObjectId, ref: Customer.name })
    customer: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Service.name })
    service: Types.ObjectId;
    
    @Prop({ required: true, type: Types.ObjectId, ref: Merchant.name })
    merchant: Types.ObjectId;

    @Prop({ required: true, type: Date, index: true })
    date: Date;

    @Prop({type: Date})
    startTime: Date;

    @Prop({type: Date})
    endTime: Date;

    @Prop({ required: true })
    price: number;

    @Prop()
    token: number;

    @Prop({ required: true, enum: ['pending', 'accepted', 'canceled', 'completed'] })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);