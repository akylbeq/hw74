import express from 'express';
import {promises as fs} from 'fs';

const messageRouter = express.Router();
const files = './messages';

messageRouter.post('/create', async (req, res) => {
    const message = req.body.message;
    if (!message) {
        res.status(400).send('Message is required');
        return;
    }
    const msg = JSON.stringify({message, date: new Date().toISOString()});
    await fs.mkdir(files, { recursive: true });
    await fs.writeFile(`${files}/${new Date().toISOString()}.json`, msg);
    res.status(200).send(msg)
});

messageRouter.get('/messages', async (req, res) => {
    const messages = await fs.readdir(files)
    const messagesList: { message: string, date: string} [] = [];

    for (const msg of messages) {
        const data = await fs.readFile(`${files}/${msg}`, 'utf-8');
        const parsed = JSON.parse(data);
        messagesList.push(parsed);
    }

    res.status(200).send(messagesList.slice(-5).reverse());
});

export default messageRouter;