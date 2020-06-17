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
exports.AdministratorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const administrator_entity_1 = require("../../../entities/administrator.entity");
const api_response_class_1 = require("../../misc/api.response.class");
const crypto = require("crypto");
administrator_entity_1.Administrator;
let AdministratorService = class AdministratorService {
    constructor(administrator) {
        this.administrator = administrator;
    }
    getAll() {
        return this.administrator.find();
    }
    async getByUsername(username) {
        const admin = await this.administrator.findOne({
            username: username
        });
        if (admin) {
            return admin;
        }
    }
    getById(id) {
        return this.administrator.findOne(id);
    }
    add(data) {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        let newAdmin = new administrator_entity_1.Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;
        return new Promise((resolve) => {
            this.administrator.save(newAdmin)
                .then(data => resolve(data))
                .catch(() => {
                const response = new api_response_class_1.ApiResponse("error", -1001);
                resolve(response);
            });
        });
    }
    async editById(id, data) {
        let admin = await this.administrator.findOne(id);
        if (admin === undefined) {
            return new Promise((resolve) => {
                resolve(new api_response_class_1.ApiResponse("error", -1002));
            });
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        admin.passwordHash = passwordHashString;
        return this.administrator.save(admin);
    }
};
AdministratorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(administrator_entity_1.Administrator)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdministratorService);
exports.AdministratorService = AdministratorService;
//# sourceMappingURL=administrator.service.js.map