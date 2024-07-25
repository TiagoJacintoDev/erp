import { config } from '../config';
import { Database } from './Database';

const database = new Database(config);

export { database };
