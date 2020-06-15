"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controllers/app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const database_configuration_1 = require("../config/database.configuration");
const administrator_entity_1 = require("../entities/administrator.entity");
const administrator_service_1 = require("./services/administrator/administrator.service");
const antikvitet_entity_1 = require("../entities/antikvitet.entity");
const country_entity_1 = require("../entities/country.entity");
const ingredient_entity_1 = require("../entities/ingredient.entity");
const ingredientAntikvitet_entity_1 = require("../entities/ingredientAntikvitet.entity");
const photo_entity_1 = require("../entities/photo.entity");
const administrator_contoller_1 = require("./controllers/api/administrator.contoller");
const antikvitet_service_1 = require("./services/antikvitet/antikvitet.service");
const antikvitet_controler_1 = require("./controllers/api/antikvitet.controler");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: database_configuration_1.DatabaseConfiguration.hostname,
                port: 3306,
                username: database_configuration_1.DatabaseConfiguration.username,
                password: database_configuration_1.DatabaseConfiguration.password,
                database: database_configuration_1.DatabaseConfiguration.database,
                entities: [administrator_entity_1.Administrator, antikvitet_entity_1.Antikvitet, country_entity_1.Country, ingredient_entity_1.Ingredient, ingredientAntikvitet_entity_1.IngredientAntikvitet, photo_entity_1.Photo]
            }),
            typeorm_1.TypeOrmModule.forFeature([
                administrator_entity_1.Administrator,
                antikvitet_entity_1.Antikvitet,
            ])
        ],
        controllers: [
            app_controller_1.AppController,
            administrator_contoller_1.AdministratorController,
            antikvitet_controler_1.AntikvitetController,
        ],
        providers: [administrator_service_1.AdministratorService, antikvitet_service_1.AntikvitetService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map