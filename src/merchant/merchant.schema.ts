import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";

export  type MerchantDocument = Merchant & Document;

@Schema({timestamps:true})
export class Merchant {

    @Prop({required:true, type:Types.ObjectId, ref: User.name})
    user: Types.ObjectId;

    @Prop()
    name:string;

    @Prop()
    longitude:string;

    @Prop()
    latitude:string

    @Prop()
    openTime:Date

    @Prop()
    closeTime:Date

}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);