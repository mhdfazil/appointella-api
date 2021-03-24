import { Types } from "mongoose";

export class CustomerDto{
    readonly user:Types.ObjectId;
    readonly firstName?:string;
    readonly lastName?:string;
}