import { Types } from "mongoose";

export class AppointmentDto {
    readonly customer: Types.ObjectId;
    readonly service: Types.ObjectId;
    readonly subService: number;
    readonly price: number;
    readonly position: string;
    readonly status: string;
}