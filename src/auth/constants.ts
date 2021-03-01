export const jwtConstants = {
    secret: 'thisismysecretkey',
};

export enum Role {
    Merchant = 'merchant',
    Admin = 'admin',
    Customer = 'customer',
};

export const saltOrRounds = 10;