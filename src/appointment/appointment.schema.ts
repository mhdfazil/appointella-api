import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Service } from "src/service/service.schema";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {

    @Prop({ required:true })
    customer: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: Service.name })
    service: Types.ObjectId;

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