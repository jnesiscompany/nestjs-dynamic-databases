import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CarManufacturer } from './car-manufacturer.entity';

@Injectable()
export class CarManufacturersService {
  constructor(private moduleRef: ModuleRef) {}

  private async loadEntityManager(systemId: string): Promise<EntityManager> {
    return this.moduleRef.get(getEntityManagerToken(`database-${systemId}`), {
      strict: false,
    });
  }
  async findAll(countryCode: string): Promise<CarManufacturer[]> {
    const entityManager = await this.loadEntityManager(countryCode);
    if (!entityManager) {
      return [];
    }

    return entityManager.find(CarManufacturer);
  }

  async onApplicationBootstrap() {
    return Promise.all([
      this.initializeData('FR', ['Peugeot', 'Renault']),
      this.initializeData('DE', [
        'Audi',
        'Mercedes',
        'Porsche',
        'BMW',
        'Volkswagen',
      ]),
      this.initializeData('GB', ['Aston Martin', 'Bentley', 'Jaguar']),
    ]);
  }

  private async initializeData(systemId: string, manufacturers: string[]) {
    const entityManager = await this.loadEntityManager(systemId);
    const count = await entityManager.count(CarManufacturer);
    if (count === 0) {
      const manufacturersToCreate = manufacturers.map((manufacturer) =>
        entityManager.create(CarManufacturer, {
          name: manufacturer,
        }),
      );
      return entityManager.save(manufacturersToCreate);
    }
  }
}
