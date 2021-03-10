import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";
import { Service } from "src/service/service.schema";

export  type MerchantDocument = Merchant & Document;

@Schema({timestamps:true})
export class Merchant {

    @Prop({required:true, type:Types.ObjectId, ref: User.name})
    user: Types.ObjectId;

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