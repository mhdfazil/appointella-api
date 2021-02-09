import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export  type MerchantDocument = Merchant & Document;

@Schema({timestamps:true})
export class Merchant {

    @Prop({required:true})
    userId:string;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    longitude:string;

    @Prop({required:true})
    latitude:string

    @Prop({required:true})
    openTime:string

    @Prop({required:true})
    closeTime:string

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);