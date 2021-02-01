import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true, unique: true })
    user_name: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: true})
    email: string;

    @Prop({ required: true})
    mobile_no: string;

    @Prop({ required: true})
    address_line1: string;

    @Prop()
    address_line2: string;

    @Prop({ required: true})
    type: string;

    @Prop()
    image: string;

    @Prop({ default: false })
    deleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);