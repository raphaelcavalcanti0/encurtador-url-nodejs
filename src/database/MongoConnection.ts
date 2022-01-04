import { config } from '../config/Constants';
import mongoose from 'mongoose';

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION);
        } catch (error) {

        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.connection.close();
        } catch (error) {

        }
    }
}