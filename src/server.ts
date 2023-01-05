import express from 'express';
import morgan  from 'morgan';
import cors    from 'cors';

const app = express();

app.get("/", (req, res) => {
    console.log('Root request detected!');
    res.status(200);
    res.json({
        data: {
            message: 'Hello from Express!',
            description: 'Oleksander, you can do it!'
        }
    })
});

export default app;
