import { Antikvitet } from "../../../entities/antikvitet.entity";
import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req, Delete, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AntikvitetService } from "../../services/antikvitet/antikvitet.service";






@Controller('api/antikvitet')
@Crud({
    model: { type: Antikvitet },
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
})
export class AntikvitetController {
    constructor(
        public service: AntikvitetService
        
        ) {

        }
    }