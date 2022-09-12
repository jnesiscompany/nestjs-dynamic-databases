import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config(); // used to get process.env access prior to AppModule instanciation

export const getDatabaseSystemIds = (): string[] => {
  return process.env.DATABASE_SYSTEM_IDS.split(',');
};

export default registerAs('orm', () => {
  const config = {};

  getDatabaseSystemIds().forEach((systemId) => {
    config[systemId] = {
      type: process.env[`DB_${systemId}_TYPE`],
      host: process.env[`DB_${systemId}_HOST`],
      port: parseInt(process.env[`DB_${systemId}_PORT`]),
      username: process.env[`DB_${systemId}_USERNAME`],
      password: process.env[`DB_${systemId}_PASSWORD`],
      database: process.env[`DB_${systemId}_DATABASE`],
      synchronize: process.env[`DB_${systemId}_SYNCHRONIZE`] === 'true',
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    };
  });

  return config;
});
