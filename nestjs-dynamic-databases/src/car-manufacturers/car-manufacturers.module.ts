import { Module } from '@nestjs/common';
import { CarManufacturersController } from './car-manufacturers.controller';
import { CarManufacturersService } from './car-manufacturers.service';

@Module({
  controllers: [CarManufacturersController],
  providers: [CarManufacturersService],
})
export class CarManufacturersModule {}
