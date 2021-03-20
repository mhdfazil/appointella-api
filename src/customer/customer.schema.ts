import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Types } from "mongoose";
import { User } from "src/user/user.schema";

export  type CustomerDocument = Customer & Document;

@Schema({timestamps:true})
export class Customer {

    @Prop({required:true, type: Types.ObjectId, ref: User.name})
    user: Types.ObjectId;

    @Prop()
    firstName:string;

    @Prop()
    lastName:string;


}

export const CustomerSchema = SchemaFactory.createForClass(Customer);