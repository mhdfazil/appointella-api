export class MerchantUpdateDto{
    readonly user:string;
    readonly name:string;
    readonly longitude:string;
    readonly latitude:string;
    readonly openTime:Date;
    readonly closeTime:Date;
    readonly password: string;
    readonly currentPassword: string;
    readonly email: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    image?: string;
    readonly fcmToken?: string;
    readonly deleted: boolean;

}