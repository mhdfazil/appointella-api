import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type AdminDocument = Admin & Document;

@Schema({timestamps:true})
export class Admin {

    @Prop({required:true})
    user_id:string;

    @Prop({required:true})
    first_name:string;

    @Prop({required:true})
    last_name:string;


}

export const AdminSchema = SchemaFactory.createForClass(Admin);