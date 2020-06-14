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
exports.IngredientAntikvitet = void 0;
const typeorm_1 = require("typeorm");
const antikvitet_entity_1 = require("./antikvitet.entity");
const ingredient_entity_1 = require("./ingredient.entity");
let IngredientAntikvitet = class IngredientAntikvitet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "ingredient_antiviktet",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], IngredientAntikvitet.prototype, "ingredientAntiviktet", void 0);
__decorate([
    typeorm_1.Column("int", { name: "antikvitet_id", unsigned: true }),
    __metadata("design:type", Number)
], IngredientAntikvitet.prototype, "antikvitetId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "ingredient_id", unsigned: true }),
    __metadata("design:type", Number)
], IngredientAntikvitet.prototype, "ingredientId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => antikvitet_entity_1.Antikvitet, (antikvitet) => antikvitet.ingredientAntikvitets, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
    typeorm_1.JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }]),
    __metadata("design:type", antikvitet_entity_1.Antikvitet)
], IngredientAntikvitet.prototype, "antikvitet", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ingredient_entity_1.Ingredient, (ingredient) => ingredient.ingredientAntikvitets, { onDelete: "NO ACTION", onUpdate: "CASCADE" }),
    typeorm_1.JoinColumn([{ name: "ingredient_id", referencedColumnName: "ingredientId" }]),
    __metadata("design:type", ingredient_entity_1.Ingredient)
], IngredientAntikvitet.prototype, "ingredient", void 0);
IngredientAntikvitet = __decorate([
    typeorm_1.Index("fk_ingredient_antikvitet_antikvitet_id", ["antikvitetId"], {}),
    typeorm_1.Index("fk_ingredient_antikvitet_ingredient_id", ["ingredientId"], {}),
    typeorm_1.Entity()
], IngredientAntikvitet);
exports.IngredientAntikvitet = IngredientAntikvitet;
//# sourceMappingURL=ingredientAntikvitet.entity.js.map