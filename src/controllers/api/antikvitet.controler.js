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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntikvitetController = void 0;
const antikvitet_entity_1 = require("../../../entities/antikvitet.entity");
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const antikvitet_service_1 = require("../../services/antikvitet/antikvitet.service");
let AntikvitetController = class AntikvitetController {
    constructor(service) {
        this.service = service;
    }
};
AntikvitetController = __decorate([
    common_1.Controller('api/antikvitet'),
    crud_1.Crud({
        model: { type: antikvitet_entity_1.Antikvitet },
        params: {
            id: {
                field: 'antikvitetId',
                type: 'number',
                primary: true
            }
        },
        query: {
            join: {
                photos: {
                    eager: true
                },
                ingredientAntikvitets: {
                    eager: true
                },
                ingredients: {
                    eager: true
                }
            }
        }
    }),
    __metadata("design:paramtypes", [antikvitet_service_1.AntikvitetService])
], AntikvitetController);
exports.AntikvitetController = AntikvitetController;
//# sourceMappingURL=antikvitet.controler.js.map