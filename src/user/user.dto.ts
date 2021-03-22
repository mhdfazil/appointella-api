export class UserDto{
    readonly email: string;
    readonly password: string;
    readonly mobileNo: string;
    readonly addressLine1: string;
    readonly addressLine2: string;
    readonly type: string;
    image?: string;
    readonly deleted: boolean;
}