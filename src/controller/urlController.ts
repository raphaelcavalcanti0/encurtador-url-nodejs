import { config } from "../config/Constants";
import { Request, Response } from "express";
import shortid from "shortid";
import { URLModel } from "../model/URL";
import { MongoConnection } from '../database/MongoConnection';

const database = new MongoConnection();

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        await database.connect();
        const { originURL } = req.body;
        const url = await URLModel.findOne({ originURL });
        if (url) {
            database.disconnect();
            res.json(url);
        }
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`
        const newUrl = await URLModel.create({ hash, shortURL, originURL })
        await database.disconnect();
        res.json(newUrl);

    }

    public async redirect(req: Request, res: Response): Promise<void> {
        await database.connect();
        const { hash } = req.params;
        const url = await URLModel.findOne({ hash });
        const { originURL } = url;
        if (url) {
            await database.disconnect();
            res.redirect(originURL);
        }
    }
}