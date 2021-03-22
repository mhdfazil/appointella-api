import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Service } from "src/service/service.schema";
import { User } from "src/user/user.schema";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {

    @Prop({ required:true, type: Types.ObjectId, ref: User.name })
    customer: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Service.name })
    service: Types.ObjectId;
    
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    merchant: Types.ObjectId;

    @Prop({ required: true, type: Date, index: true })
    date: Date;

    @Prop({type: Date})
    startTime: Date;

    @Prop({type: Date})
    endTime: Date;

    @Prop()
    subService: number;

    @Prop({ required: true })
    price: number;

    @Prop()
    token: number;

    @Prop({ required: true, enum: ['pending', 'accepted', 'canceled', 'completed'] })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);