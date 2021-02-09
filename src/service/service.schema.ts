import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Merchant } from "src/merchant/merchant.schema";

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {

    @Prop({ required:true, type: Types.ObjectId, ref: Merchant.name })
    merchant: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true, enum: ['number', 'time'] })
    type: string;

    @Prop({ required: true, default: 1 })
    maxCount: number;

    @Prop({ default: false })
    deleted: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);