import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarManufacturerDto } from './car-manufacturer.dto';
import { CarManufacturersService } from './car-manufacturers.service';

@Controller('car-manufacturers')
export class CarManufacturersController {
  constructor(private carManufacturersService: CarManufacturersService) {}

  @Get(':country')
  async findAll(
    @Param('country') country: string,
  ): Promise<CarManufacturerDto[]> {
    return this.carManufacturersService.findAll(country);
  }
}
