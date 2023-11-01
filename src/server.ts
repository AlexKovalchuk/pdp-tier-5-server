import express                                  from 'express';
import morgan                                   from 'morgan';
import cors                                     from 'cors';
import { signIn, signUp }                       from './handlers/sign-handlers';
import { body, check, oneOf, validationResult } from 'express-validator';
import { handleInputErrors }                    from '@src/modules/middleware';
import expressJwt from 'express-jwt';
import { protect } from './modules/auth';
import { log } from 'console';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200);
    res.json({
        data: {
            message: 'Hello from Express!',
            description: 'Oleksander, you can do it!'
        }
    })
});

app.post(
    '/signup',
    oneOf([
        [check('email').exists(), check('password').exists()],
    ]),
    signUp
);

app.post(
    '/signin',
    oneOf([
        [check('email').exists(), check('password').exists()],
    ]),
    signIn
);

app.get("/protected-route", protect, (req, res) => {
    // This route handler will only be executed if the user is authenticated
    console.log('/protected-route')
    res.status(200).json({
        data: {
            message: 'This is a protected route',
            user: 'Some user'
        }
    });
});

export default app;
