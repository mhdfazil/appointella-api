import { Types } from "mongoose";

export class MerchantDto{
    readonly user:Types.ObjectId;
    readonly name:string;
    readonly longitude:string;
    readonly latitude:string;
    readonly openTime:string;
    readonly closeTime:string;

}