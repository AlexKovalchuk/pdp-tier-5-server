import clientDb          from './client-db';
import { UserInterface } from '../interfaces/user-interface';
import {
    pdpDB,
    usersCollectionDB
}                        from '../constants/mongo-constants';

export async function findUserByEmail(email: string): Promise<UserInterface[]> {
    const mongoDB = await clientDb;
    return await mongoDB.db(pdpDB).collection(usersCollectionDB).find({ email }).toArray();
}

export async function createUerDocument(user: UserInterface)
    : Promise<UserInterface[] | boolean> {
    const mongoDB = await clientDb;
    const collection = mongoDB.db(pdpDB).collection(usersCollectionDB);
    const findUsers: UserInterface[] = await findUserByEmail(user.email);
    if ( !findUsers?.length ) {
        const defaultUser: UserInterface = {
            name: '',
            birthdate: null,
            address: { street: '', city: '', state: '' },
        };
        
        await collection.insertOne({ ...defaultUser, ...user });
        
        return await collection.find({ email: user.email }).toArray()
    }
    
    return Promise.resolve(false);
}
