import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarManufacturer } from './car-manufacturer.entity';
import { CarManufacturersService } from './car-manufacturers.service';

@Controller('car-manufacturers')
export class CarManufacturersController {
  constructor(private carManufacturersService: CarManufacturersService) {}

  @Get(':country')
  async findAll(@Param('country') country: string): Promise<CarManufacturer[]> {
    return this.carManufacturersService.findAll(country);
  }
}
