import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Administrator } from '../../../entities/administrator.entity';
import { AddAdministratorDto } from '../../dtos/administrator/add.administrator.dto';
import { EditAdmnistratorDto } from '../../dtos/administrator/edit.admnistrator.dto';

Administrator
@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator: Repository<Administrator>,

    ) { }

    getAll(): Promise<Administrator[]>{
        return this.administrator.find();
    }
    getById(id: number): Promise<Administrator>{
        return this.administrator.findOne(id);
    }
    add(data: AddAdministratorDto){
        const cryprto = require('crypto');

        const passwordHash = cryprto.createHash('sha512');
        passwordHash.update(data.password);

        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        this.administrator.save(newAdmin);

        return this.administrator.save(newAdmin);
    }

    async editById(id: number, data: EditAdmnistratorDto): Promise<Administrator>{
        let admin: Administrator = await this.administrator.findOne(id);

        const cryprto = require('crypto');
        const passwordHash = cryprto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase()


        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }
}
