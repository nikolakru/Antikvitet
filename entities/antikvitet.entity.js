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
exports.Antikvitet = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("./country.entity");
const ingredientAntikvitet_entity_1 = require("./ingredientAntikvitet.entity");
const photo_entity_1 = require("./photo.entity");
const ingredient_entity_1 = require("./ingredient.entity");
let Antikvitet = class Antikvitet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "antikvitet_id",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Antikvitet.prototype, "antikvitetId", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        name: "name",
        unique: true,
        length: 50,
        default: () => "'0'",
    }),
    __metadata("design:type", String)
], Antikvitet.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int", { name: "country_id", unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], Antikvitet.prototype, "countryId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "descripton", length: 250 }),
    __metadata("design:type", String)
], Antikvitet.prototype, "descripton", void 0);
__decorate([
    typeorm_1.Column("int", { name: "price" }),
    __metadata("design:type", Number)
], Antikvitet.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("int", { name: "year" }),
    __metadata("design:type", Number)
], Antikvitet.prototype, "year", void 0);
__decorate([
    typeorm_1.ManyToOne(() => country_entity_1.Country, (country) => country.antikvitets, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "country_id", referencedColumnName: "countryId" }]),
    __metadata("design:type", country_entity_1.Country)
], Antikvitet.prototype, "country2", void 0);
__decorate([
    typeorm_1.OneToMany(() => country_entity_1.Country, (country) => country.antikvitet),
    __metadata("design:type", Array)
], Antikvitet.prototype, "countries", void 0);
__decorate([
    typeorm_1.OneToMany(() => ingredientAntikvitet_entity_1.IngredientAntikvitet, (ingredientAntikvitet) => ingredientAntikvitet.antikvitet),
    __metadata("design:type", Array)
], Antikvitet.prototype, "ingredientAntikvitets", void 0);
__decorate([
    typeorm_1.ManyToMany(type => ingredient_entity_1.Ingredient, ingredient => ingredient.antikvitets),
    typeorm_1.JoinTable({
        name: "ingredient_antikvitet",
        joinColumn: { name: "antikvitet_id", referencedColumnName: "antikvitetId" },
        inverseJoinColumn: { name: "ingredient_id", referencedColumnName: "ingredientId" }
    }),
    __metadata("design:type", Array)
], Antikvitet.prototype, "ingredients", void 0);
__decorate([
    typeorm_1.OneToMany(() => photo_entity_1.Photo, (photo) => photo.antikvitet),
    __metadata("design:type", Array)
], Antikvitet.prototype, "photos", void 0);
Antikvitet = __decorate([
    typeorm_1.Index("fk_antikvitet_country_id", ["countryId"], {}),
    typeorm_1.Index("uq_antikvitet_name", ["name"], { unique: true }),
    typeorm_1.Entity()
], Antikvitet);
exports.Antikvitet = Antikvitet;
//# sourceMappingURL=antikvitet.entity.js.map