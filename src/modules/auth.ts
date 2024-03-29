import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";


export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
    const token = jwt.sign(
{ id: user.id, email: user.email },
        process.env.JWT_SECRET
    );
    return token;
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        res.status(401);
        res.send("Not authorized bearer");
        return;
    }
    
    const [, token] = bearer.split(" ");
    if (!token) {
        res.status(401);
        res.send("Not authorized token");
        return;
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
        // return;
    } catch (e) {
        res.status(401);
        res.send("Not authorized catch");
        // return;
    }
};
