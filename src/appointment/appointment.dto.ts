import { Types } from "mongoose";

export class AppointmentDto {
    readonly customer: Types.ObjectId;
    readonly service: Types.ObjectId;
    readonly merchant: Types.ObjectId;
    readonly date: Date;
    readonly startTime: string;
    readonly endTime: string;
    readonly subService: number;
    readonly price: number;
    readonly position: string;
    readonly status: string;
}