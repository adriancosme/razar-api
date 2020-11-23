import * as fs from 'fs';
import {parse} from 'dotenv';
import * as path from 'path';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existsPath = fs.existsSync(path.normalize(envFilePath));
            if (!existsPath) {
                console.log('.env file does not exist');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            };
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}