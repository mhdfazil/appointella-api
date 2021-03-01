import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";

export type AdminDocument = Admin & Document;

@Schema({timestamps:true})
export class Admin {

    @Prop({required:true, type: Types.ObjectId, ref: User.name })
    user: Types.ObjectId;

    @Prop({required:true})
    firstName:string;

    @Prop({required:true})
    lastName:string;


}

export const AdminSchema = SchemaFactory.createForClass(Admin);