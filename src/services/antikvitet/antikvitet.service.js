"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntikvitetService = void 0;
const common_1 = require("@nestjs/common");
const antikvitet_entity_1 = require("../../../entities/antikvitet.entity");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const ingredientAntikvitet_entity_1 = require("../../../entities/ingredientAntikvitet.entity");
let AntikvitetService = class AntikvitetService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(antikvitet, ingredientAntikvitet) {
        super(antikvitet);
        this.antikvitet = antikvitet;
        this.ingredientAntikvitet = ingredientAntikvitet;
    }
    async createFullAntikvitet(data) {
        let newAntikvitet = new antikvitet_entity_1.Antikvitet();
        newAntikvitet.name = data.name;
        newAntikvitet.descripton = data.description;
        newAntikvitet.countryId = data.countryId;
        newAntikvitet.year = data.year;
        newAntikvitet.price = data.price;
        let savedAntikvitet = await this.antikvitet.save(newAntikvitet);
        for (let ingredient of data.ingredients) {
            let newIngredientAntikvitet = new ingredientAntikvitet_entity_1.IngredientAntikvitet();
            newIngredientAntikvitet.antikvitetId = savedAntikvitet.antikvitetId;
            newIngredientAntikvitet.ingredientId = ingredient.ingredientId;
            await this.ingredientAntikvitet.save(newIngredientAntikvitet);
        }
        return await this.antikvitet.findOne(savedAntikvitet.antikvitetId, {
            relations: [
                "country2",
                "ingredients"
            ]
        });
    }
};
AntikvitetService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(antikvitet_entity_1.Antikvitet)),
    __param(1, typeorm_2.InjectRepository(ingredientAntikvitet_entity_1.IngredientAntikvitet)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AntikvitetService);
exports.AntikvitetService = AntikvitetService;
//# sourceMappingURL=antikvitet.service.js.map