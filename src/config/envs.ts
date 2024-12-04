import * as joi from 'joi';
import 'dotenv/config';

interface EnvsSchema {
  PORT: number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_SECRET: string;
  DATABASE: DatabaseOptions;
  JWT_SECRET: string;
  NAT_SERVERS: string[];
  
}

interface DatabaseOptions {
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_USER: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_SECRET: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().port(),
    DB_NAME_AUTH: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_USER: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NAT_SERVERS: process.env.NAT_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsSchema = {
  PORT: value.PORT,
  GOOGLE_CLIENT_ID:  value.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET:  value.GOOGLE_SECRET,
  DATABASE: {
    DB_HOST: value.DB_HOST,
    DB_PORT: value.DB_PORT,
    DB_NAME: value.DB_NAME_AUTH,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_USER: value.DB_USER,
  },
  JWT_SECRET:  value.JWT_SECRET,
  NAT_SERVERS : value.NAT_SERVERS

};
