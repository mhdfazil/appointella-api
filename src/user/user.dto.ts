export class UserDto{
    readonly email: string;
    password: string;
    readonly currentPassword: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    image?: string;
    readonly fcmToken?: string;
    readonly deleted: boolean;
}