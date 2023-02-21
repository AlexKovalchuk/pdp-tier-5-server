import express                                  from 'express';
import morgan                                   from 'morgan';
import cors                                     from 'cors';
import { signIn, signUp }                       from './handlers/sign-handlers';
import { body, check, oneOf, validationResult } from 'express-validator';
import { handleInputErrors }                    from '@src/modules/middleware';

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

export default app;
