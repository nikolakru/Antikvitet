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
exports.Ingredient = void 0;
const typeorm_1 = require("typeorm");
const ingredientAntikvitet_entity_1 = require("./ingredientAntikvitet.entity");
let Ingredient = class Ingredient {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "ingredient_id",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Ingredient.prototype, "ingredientId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "name", unique: true, length: 50 }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => ingredientAntikvitet_entity_1.IngredientAntikvitet, (ingredientAntikvitet) => ingredientAntikvitet.ingredient),
    __metadata("design:type", Array)
], Ingredient.prototype, "ingredientAntikvitets", void 0);
Ingredient = __decorate([
    typeorm_1.Index("uq_ingredient_name", ["name"], { unique: true }),
    typeorm_1.Entity()
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.entity.js.map