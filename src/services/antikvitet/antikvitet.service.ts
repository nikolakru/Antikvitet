import { Injectable } from "@nestjs/common";
import { Antikvitet } from "../../../entities/antikvitet.entity";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";






@Injectable()
export class AntikvitetService extends TypeOrmCrudService<Antikvitet> {
    constructor(@InjectRepository(Antikvitet) private readonly antikvitet: Repository<Antikvitet>){
        super(antikvitet);
    }
        
        

    }

    

