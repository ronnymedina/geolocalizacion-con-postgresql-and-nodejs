import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ default: 'Example place' })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsInt()
  resourceId: number;

  @ApiProperty({ default: '-34.6032149933797' })
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @ApiProperty({ default: '-58.38162153080522' })
  @IsNotEmpty()
  @IsLongitude()
  lng: string;
}


export class GetPlaces {
  @ApiProperty({ description: 'range in kilometers', default: 5 })
  range: string;

  @ApiProperty({ default: '-34.6032149933797' })
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @ApiProperty({ default: '-58.38162153080522' })
  @IsNotEmpty()
  @IsLongitude()
  lng: string;
}
