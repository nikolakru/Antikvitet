"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtDataAdmnistratorDto = void 0;
class JwtDataAdmnistratorDto {
    toPlainObject() {
        return {
            administratorId: this.administratorId,
            username: this.username,
            ext: this.ext,
            ip: this.ip,
            ua: this.ua,
        };
    }
}
exports.JwtDataAdmnistratorDto = JwtDataAdmnistratorDto;
//# sourceMappingURL=jwt.data.administrator.dto.js.map