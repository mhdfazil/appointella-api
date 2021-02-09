import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type AdminDocument = Admin & Document;

@Schema({timestamps:true})
export class Admin {

    @Prop({required:true})
    userId:string;

    @Prop({required:true})
    firstName:string;

    @Prop({required:true})
    lastName:string;


}

export const AdminSchema = SchemaFactory.createForClass(Admin);