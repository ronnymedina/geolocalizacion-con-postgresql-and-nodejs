import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePlaceDto, GetPlaces } from './dto';
import { Place } from './entities/place.entity';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/place')
  async createLocation(@Body() data: CreatePlaceDto): Promise<Place> {
    const place = await this.appService.createPlace(data);

    this.logger.debug('new place', { data: place });

    return place;
  }

  @Get('/get-places')
  getPlaces(@Query() query: GetPlaces): Promise<Record<string, unknown>[]> {
    return this.appService.getPlaces(query);
  }
}
