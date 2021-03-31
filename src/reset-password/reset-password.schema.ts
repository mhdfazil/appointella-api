import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";

export type ResetPasswordDocument = ResetPassword & Document;

@Schema({ timestamps: true })
export class ResetPassword {

    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ required: true, ref: User.name, type: Types.ObjectId, unique: true })
    user: Types.ObjectId;

    @Prop({ required: true, enum: ['created', 'form-sent', 'done'], default: 'created' })
    reset: string;

    @Prop({ type: Date, default: Date.now, expires: '1d' })
    expiresAt: Date;

}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);