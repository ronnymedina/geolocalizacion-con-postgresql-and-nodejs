import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreatePlaceDto, GetPlaces } from './dto';
import { Place } from './entities/place.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private connection: Connection,
  ) {}

  createPlace(place: CreatePlaceDto) {
    return this.placeRepository.save({
      ...place,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lng),
    });
  }

  getPlaces(data: GetPlaces) {
    const sql = `
      SELECT
        plc.id AS id,
        plc.name AS name,
        (ROUND(earth_distance(ll_to_earth($1, $2), ll_to_earth(plc.lat, plc.lng))::NUMERIC, 2)/1000) AS distance
      FROM places AS plc
      WHERE (earth_box(ll_to_earth ($1, $2), $3) @> ll_to_earth (plc.lat, plc.lng) AND earth_distance(ll_to_earth ($1, $2), ll_to_earth (plc.lat, plc.lng)) < $3)
      ORDER BY distance
    `;

    const lng = parseFloat(data.lng);
    const lat = parseFloat(data.lat);
    const range = parseInt(data.range) * 1000;

    return this.connection.query(sql, [lat, lng, range]);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
