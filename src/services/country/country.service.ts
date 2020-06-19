import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../../entities/country.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country> {
  constructor(@InjectRepository(Country) private readonly country: Repository<Country>) {
    super(country)
  }
}