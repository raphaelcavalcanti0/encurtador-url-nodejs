import { URLController } from './controller/urlController';
import express, { Request, Response } from 'express';

const api = express();
const port = 4000;

api.use(express.json());

api.get('/test', (req: Request, res: Response) => {
    res.json({ result: "ok" });
});

const urlController = new URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/test`)
});
