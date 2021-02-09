import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type CustomerDocument = Customer & Document;

@Schema({timestamps:true})
export class Customer {

    @Prop({required:true})
    userId:string;

    @Prop({required:true})
    firstName:string;

    @Prop({required:true})
    lastName:string;


}

export const CustomerSchema = SchemaFactory.createForClass(Customer);