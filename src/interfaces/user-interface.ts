export interface UserInterface {
    email?: string;
    password?: string;
    name?: string;
    address?: UserAddressInterface;
    age?: number;
    birthdate?: Date | null;
}

export interface UserAddressInterface {
    street: string;
    city: string;
    state: string;
}

export interface SignInResponse {
    token: string;
    data: any;
    expiresIn: number;
}