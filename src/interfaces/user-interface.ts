export interface UserInterface {
    email?: string;
    password?: string;
    name?: string;
    address?: UserAddressInterface;
    age?: number;
    birthdate?: Date | null;
}

interface UserAddressInterface {
    street: string;
    city: string;
    state: string;
}
