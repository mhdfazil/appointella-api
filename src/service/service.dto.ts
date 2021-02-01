import { Types } from "mongoose";

export class ServiceDto {
    readonly merchant: Types.ObjectId;
    readonly name: string;
    readonly price: number;
    readonly duration: number;
    readonly type: string;
    readonly maxCount: number;
    readonly deleted: boolean;
}