import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from '../config/database.configuration';
import { Administrator } from '../entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { Antikvitet } from '../entities/antikvitet.entity';
import { Country } from '../entities/country.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientAntikvitet } from '../entities/ingredientAntikvitet.entity';
import { Photo } from '../entities/photo.entity';
import { AdministratorController } from './controllers/api/administrator.contoller';
import { AntikvitetService } from './services/antikvitet/antikvitet.service';
import { AntikvitetController } from './controllers/api/antikvitet.controler';
import { AuthController } from './controllers/api/auth.controller';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Administrator, Antikvitet, Country, Ingredient, IngredientAntikvitet, Photo ]
    }),
      TypeOrmModule.forFeature([ 
        Administrator,
        Antikvitet,
        IngredientAntikvitet,
        

      ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    AntikvitetController,
    AuthController,
    
    
  ],
  providers: [AdministratorService, AntikvitetService,
  
],
})
export class AppModule {}
