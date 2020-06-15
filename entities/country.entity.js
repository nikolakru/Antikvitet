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
exports.Country = void 0;
const typeorm_1 = require("typeorm");
const antikvitet_entity_1 = require("./antikvitet.entity");
let Country = class Country {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "country_id", unsigned: true }),
    __metadata("design:type", Number)
], Country.prototype, "countryId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "country_name", unique: true, length: 50 }),
    __metadata("design:type", String)
], Country.prototype, "countryName", void 0);
__decorate([
    typeorm_1.OneToMany(() => antikvitet_entity_1.Antikvitet, (antikvitet) => antikvitet.country2),
    __metadata("design:type", Array)
], Country.prototype, "antikvitets", void 0);
__decorate([
    typeorm_1.ManyToOne(() => antikvitet_entity_1.Antikvitet, (antikvitet) => antikvitet.countries, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "antikvitet_id", referencedColumnName: "antikvitetId" }]),
    __metadata("design:type", antikvitet_entity_1.Antikvitet)
], Country.prototype, "antikvitet", void 0);
Country = __decorate([
    typeorm_1.Index("fk_country_antikvitet_id", ["antikvitetId"], {}),
    typeorm_1.Index("uq_country_country_name", ["countryName"], { unique: true }),
    typeorm_1.Entity()
], Country);
exports.Country = Country;
//# sourceMappingURL=country.entity.js.map