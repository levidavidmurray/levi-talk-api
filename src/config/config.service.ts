import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as twilio from 'twilio';

require('dotenv').config();

enum ConfigKey {
    POSTGRES_HOST = 'POSTGRES_HOST',
    POSTGRES_PORT = 'POSTGRES_PORT',
    POSTGRES_USER = 'POSTGRES_USER',
    POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
    POSTGRES_DATABASE = 'POSTGRES_DATABASE',
    TWILIO_SID = 'TWILIO_ACCOUNT_SID',
    TWILIO_TOKEN = 'TWILIO_AUTH_TOKEN',
    TWILIO_NUMBER = 'TWILIO_NUMBER',
    SECRET_KEY = 'SECRET_KEY',
}

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode !== 'DEV';
    }

    public getTwilioClient(): twilio.Twilio {
        return twilio(this.getValue(ConfigKey.TWILIO_SID), this.getValue(ConfigKey.TWILIO_TOKEN));
    }

    public getTwilioNumber(): string {
        return this.getValue(ConfigKey.TWILIO_NUMBER);
    }

    public getSecretKey(): string {
        return this.getValue(ConfigKey.SECRET_KEY);
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue(ConfigKey.POSTGRES_HOST),
            port: parseInt(this.getValue(ConfigKey.POSTGRES_PORT), 10),
            username: this.getValue(ConfigKey.POSTGRES_USER),
            password: this.getValue(ConfigKey.POSTGRES_PASSWORD),
            database: this.getValue(ConfigKey.POSTGRES_DATABASE),

            entities: ['**/*.entity{.ts,.js}'],

            migrationsTableName: 'migration',

            migrations: ['src/migration/*.ts'],

            cli: {
                migrationsDir: 'src/migration',
            },

            ssl: this.isProduction(),
        };
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        ConfigKey.POSTGRES_HOST,
        ConfigKey.POSTGRES_PORT,
        ConfigKey.POSTGRES_USER,
        ConfigKey.POSTGRES_PASSWORD,
        ConfigKey.POSTGRES_DATABASE,
        ConfigKey.TWILIO_SID,
        ConfigKey.TWILIO_TOKEN,
        ConfigKey.SECRET_KEY,
    ]);

export { configService };
