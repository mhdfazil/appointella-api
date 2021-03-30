export class AdminUpdateDto{
    readonly user:string;
    readonly firstName:string;
    readonly lastName:string;
    readonly username: string;
    readonly currentPassword: string;
    readonly password: string;
    readonly email: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    readonly image: string;
    readonly deleted: boolean;
}