export class CreateAccount {
    fullname: string;
    email: string;
    password: string;
    addPartner?: boolean;
    partnerEmail?: string;
}


export class IUser {
    token: string;
    user: User;
}

export class User {
    fullname: string;
    email: string;
    registrationDate: Date;
    relationships: any;
    _id: string;
    __v: 0;
}

