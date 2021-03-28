export class MerchantUpdateDto{
    readonly user:string;
    readonly name:string;
    readonly longitude:string;
    readonly latitude:string;
    readonly openTime:Date;
    readonly closeTime:Date;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    image?: string;
    readonly deleted: boolean;

}