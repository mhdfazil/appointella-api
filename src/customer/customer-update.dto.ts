export class CustomerUpdateDto{
    readonly user:string;
    readonly firstName:string;
    readonly lastName:string;
    readonly currentPassword: string;
    readonly password: string;
    readonly email: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    readonly image: string;
    readonly fcmToken?: string;
    readonly deleted: boolean;
}