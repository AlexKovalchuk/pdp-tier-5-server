import { createJWT, hashPassword, comparePasswords } from "../modules/auth";
import { createUerDocument, findUserByEmail }        from '../mongodb/users-db';
import { UserInterface }                             from '../interfaces/user-interface';

// comment
export const signUp = async (req, res) => {
    
    const hash = await hashPassword(req.body.password);
    const user = await createUerDocument({
        email: req.body.email,
        password: hash,
    } as UserInterface);
    if (user) {
        const token = createJWT(user);
        res.status(200);
        res.json({ token, data: {text: 'success sing up'} });
        
    } else {
        res.status(400);
        res.json({ error: 'user already exist' });
    }
};

export const signIn = async (req, res) => {
    
    const userArray = await findUserByEmail(req.body.email);
    if (userArray.length === 0) {
        res.status(401);
        res.send("Invalid username or password");
        return;
    }
    
    const isValid = await comparePasswords(req.body.password, userArray[0].password);
    
    if (!isValid) {
        res.status(401);
        res.send("Invalid username or password");
        return;
    }
    
    const token = createJWT(userArray[0]);
    res.status(200);
    res.json({ token, data: {text: 'success sing in'} });
};
