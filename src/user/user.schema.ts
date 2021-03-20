import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 6, select: false })
    password?: string;

    @Prop()
    mobileNo: string;

    @Prop()
    addressLine1: string;

    @Prop()
    addressLine2: string;

    @Prop({ required: true, enum: ['admin', 'customer', 'merchant'] })
    type: string;

    @Prop()
    image: string;

    @Prop({ default: false, required: true })
    verified?: boolean;

    @Prop({ default: false })
    deleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);