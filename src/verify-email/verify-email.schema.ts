import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VerifyEmailDocument = VerifyEmail & Document;

@Schema({ timestamps: true })
export class VerifyEmail {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    code: string;

    @Prop({ type: Date, default: Date.now, expires: 1800 })
    expiresAt: Date;

}

export const VerifyEmailSchema = SchemaFactory.createForClass(VerifyEmail);