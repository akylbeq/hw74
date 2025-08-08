import express from 'express';
import {promises as fs} from 'fs';

const app = express();
const port = 8000;
app.use(express.json());

app.post('/create', async (req, res) => {
    const {message} = req.body;
    console.log(message)
    res.status(200).send(message);
});

app.get('/messages', async (req, res) => {
    res.status(200).send('123')
})

const run = () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

run();