import express from 'express';
import messageRouter from "./routers/messageRouter";

const app = express();
const port = 8002;
app.use(express.json());

app.use('/', messageRouter);

const run = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

run();