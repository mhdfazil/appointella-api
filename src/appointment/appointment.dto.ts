import { Types } from "mongoose";

export class AppointmentDto {
    readonly customer: Types.ObjectId;
    readonly service: Types.ObjectId;
    readonly merchant: Types.ObjectId;
    readonly date: Date;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly price: number;
    readonly token: number;
    readonly status: string;
    readonly transactionId?: string;
}