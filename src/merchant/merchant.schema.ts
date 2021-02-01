import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type MerchantDocument = Merchant & Document;

@Schema({timestamps:true})
export class Merchant {

    @Prop({required:true})
    user_id:string;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    longitude:string;

    @Prop({required:true})
    latitude:string

    @Prop({required:true})
    open_time:string

    @Prop({required:true})
    close_time:string

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);