import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarManufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
