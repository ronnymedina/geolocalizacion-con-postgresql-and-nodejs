import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'places' })
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'resource_id' })
  resourceId: number;

  @Column()
  name: string;

  @Column()
  lat: number;

  @Column()
  lng: number;
}
