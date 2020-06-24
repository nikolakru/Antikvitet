import { Controller, Post, Body, Req, HttpException, HttpStatus } from "@nestjs/common";
import { AdministratorService } from "../../services/administrator/administrator.service";
import { LoginAdministratorDto } from "../../dtos/administrator/login.administrator.dto"
import { ApiResponse } from "../../misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoAdministratorDto } from "../../dtos/administrator/login.info.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdmnistratorDto } from "../../dtos/administrator/jwt.data.administrator.dto";
import { Request } from "express";
import { jwtSecret } from "../../../config/jwt.secret";
import { JwtRefreshDataDto } from "src/dtos/administrator/jwt.refresh.dto";
import { AdministratorRefreshTokenDto } from "src/dtos/administrator/administrator.refresh.token.dto";


@Controller('auth')
export class AuthController {
    constructor(public administratorService: AdministratorService){}


        @Post('administrator/login')
        async doLogin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<ApiResponse | LoginInfoAdministratorDto>{
             const administrator = await this.administratorService.getByUsername(data.username);

             if(!administrator){
                return new Promise(resolve => 
                    resolve(new ApiResponse('error', -3001)));
            }
                const passwordHash = crypto.createHash('sha512');
                passwordHash.update(data.password);
                const passwordHashString = passwordHash.digest('hex').toUpperCase();
                

                if(administrator.passwordHash !== passwordHashString){
                    return new Promise(resolve => resolve(new ApiResponse('error', -3002)));
                }

                const jwtData = new JwtDataAdmnistratorDto();
                jwtData.administratorId = administrator.administratorId;
                jwtData.username = administrator.username;
                let sada = new Date();
                sada.setDate(sada.getDate() + 14);
                const istekTimestamp = sada.getTime()/ 1000;
                jwtData.exp = istekTimestamp;
                jwtData.ip = req.ip.toString();
                jwtData.ua = req.headers["user-agent"];


                let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret); 

                const jwtRefreshData = new JwtRefreshDataDto();
                
                jwtRefreshData.administratorId = jwtData.administratorId;
                jwtRefreshData.username = jwtData.username;
                jwtRefreshData.exp = this.getDatePlus(60 * 60 * 24 * 31)
                jwtRefreshData.ip = jwtData.ip;
                jwtRefreshData.ua = jwtData.ua;


                let refreshToken: string = jwt.sign(jwtRefreshData.toPlainObject(), jwtSecret);

                const responseObject = new LoginInfoAdministratorDto(
                administrator.administratorId,
                administrator.username,
                token,
                refreshToken,
                this.getIsoDate(jwtRefreshData.exp),
        );

        await this.administratorService.addToken(
                administrator.administratorId,
                refreshToken,
                this.getDatabseDateFormat(this.getIsoDate(jwtRefreshData.exp))
        );

        return new Promise(resolve => resolve(responseObject));

                
    }
    @Post('administrator/refresh') // http://localhost:3000/auth/administrator/refresh/
    async administratorTokenRefresh(@Req() req: Request, @Body() data: AdministratorRefreshTokenDto): Promise<LoginInfoAdministratorDto | ApiResponse> {
        const administratorToken = await this.administratorService.getAdministratorToken(data.token);

        if (!administratorToken) {
            return new ApiResponse("error", -10002, "No such refresh token!");
        }

        if (administratorToken.isValid === 0) {
            return new ApiResponse("error", -10003, "The token is no longer valid!");
        }

        const sada = new Date();
        const datumIsteka = new Date(administratorToken.expiresAt);

        if (datumIsteka.getTime() < sada.getTime()) {
            return new ApiResponse("error", -10004, "The token has expired!");
        }

        let jwtRefreshData: JwtRefreshDataDto;
        
        try {
            jwtRefreshData = jwt.verify(data.token, jwtSecret);
        } catch (e) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (!jwtRefreshData) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.ip !== req.ip.toString()) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        if (jwtRefreshData.ua !== req.headers["user-agent"]) {
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

        const jwtData = new JwtDataAdmnistratorDto();
        
        jwtData.administratorId = jwtRefreshData.administratorId;
        jwtData.username = jwtRefreshData.username;
        jwtData.exp = this.getDatePlus(60 * 5);
        jwtData.ip = jwtRefreshData.ip;
        jwtData.ua = jwtRefreshData.ua;

        let token: string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responseObject = new LoginInfoAdministratorDto(
            jwtData.administratorId,
            jwtData.username,
            token,
            data.token,
            this.getIsoDate(jwtRefreshData.exp),
        );

        return responseObject;
    }




     private getDatePlus(numberOfSeconds: number): number {
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

     private getIsoDate(timestamp: number): string {
        const date = new Date();
        date.setTime(timestamp * 1000);
        return date.toISOString();
    }

    private getDatabseDateFormat(isoFormat: string): string {
        return isoFormat.substr(0, 19).replace('T', ' ');
    }
    
}