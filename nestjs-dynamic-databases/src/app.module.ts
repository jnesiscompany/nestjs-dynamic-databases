import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarManufacturersModule } from './car-manufacturers/car-manufacturers.module';
import ormConfig, { getDatabaseSystemIds } from './common/config/orm.config';

// database connection for each system id
const databasesConfig = getDatabaseSystemIds().map((systemId) => {
  return TypeOrmModule.forRootAsync({
    name: `database-${systemId}`,
    imports: [ConfigModule.forFeature(ormConfig)],
    useFactory: (config: ConfigService) => config.get(`orm.${systemId}`),
    inject: [ConfigService],
  });
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ...databasesConfig,
    CarManufacturersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
