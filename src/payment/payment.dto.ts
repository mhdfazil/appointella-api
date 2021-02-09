import { Types } from "mongoose";

export class PaymentDto {
    readonly appointment: Types.ObjectId;
    readonly type: string;
    readonly amount: number;
    readonly status: boolean;
}