import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type CustomerDocument = Customer & Document;

@Schema({timestamps:true})
export class Customer {

    @Prop({required:true})
    user_id:string;

    @Prop({required:true})
    first_name:string;

    @Prop({required:true})
    last_name:string;


}

export const CustomerSchema = SchemaFactory.createForClass(Customer);