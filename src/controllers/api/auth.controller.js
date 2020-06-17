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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const administrator_service_1 = require("../../services/administrator/administrator.service");
const login_administrator_dto_1 = require("../../dtos/administrator/login.administrator.dto");
const api_response_class_1 = require("../../misc/api.response.class");
const crypto = require("crypto");
const login_info_administrator_dto_1 = require("../../dtos/administrator/login.info.administrator.dto");
const jwt = require("jsonwebtoken");
const jwt_data_administrator_dto_1 = require("../../dtos/administrator/jwt.data.administrator.dto");
const jwt_secret_1 = require("../../../config/jwt.secret");
let AuthController = class AuthController {
    constructor(administratorService) {
        this.administratorService = administratorService;
    }
    async doLogin(data, req) {
        const administrator = await this.administratorService.getByUsername(data.username);
        if (!administrator) {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -3001)));
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        if (administrator.passwordHash !== passwordHashString) {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -3002)));
        }
        const jwtData = new jwt_data_administrator_dto_1.JwtDataAdmnistratorDto();
        jwtData.administratorId = administrator.administratorId;
        jwtData.username = administrator.username;
        let sada = new Date();
        sada.setDate(sada.getDate() + 14);
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.ext = istekTimestamp;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];
        let token = jwt.sign(jwtData.toPlainObject(), jwt_secret_1.jwtSecret);
        const responseObject = new login_info_administrator_dto_1.LoginInfoAdministratorDto(administrator.administratorId, administrator.username, token);
        return new Promise(resolve => resolve(responseObject));
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_administrator_dto_1.LoginAdministratorDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "doLogin", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [administrator_service_1.AdministratorService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map