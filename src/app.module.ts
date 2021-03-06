import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PhotoService } from './services/photo/photo.service';
import { IngredientService } from './services/ingredient/ingredient.service';
import { CountryService } from './services/country/country.service';
import { IngredientController } from './controllers/api/ingredient.contoller';
import { CountryController } from './controllers/api/country.controller';
import { AdministratorToken } from 'entities/administrator-token.entity';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Administrator, Antikvitet, Country, Ingredient, IngredientAntikvitet, Photo, AdministratorToken ]
    }),
      TypeOrmModule.forFeature([ 
        Administrator,
        Antikvitet,
        IngredientAntikvitet,
        Ingredient,
        Photo,
        Country,
        AdministratorToken,
      
        

      ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    AntikvitetController,
    AuthController,
    IngredientController,
    CountryController,

    
    
  ],
  providers: [AdministratorService,
     AntikvitetService,
     PhotoService,
     IngredientService,
     CountryService
     
     

  
],
  exports: [AdministratorService,
  ],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude('auth/*')
    .forRoutes({path: 'api/*', method: RequestMethod.POST},
    {path: 'api/*', method: RequestMethod.PATCH},
    {path: 'api/*', method: RequestMethod.DELETE},
    {path: 'api/*', method: RequestMethod.PUT},
    )
  }
}
