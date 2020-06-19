import { Injectable } from "@nestjs/common";
import { Photo } from "entities/photo.entity";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    constructor(@InjectRepository(Photo)private readonly photo: Repository<Photo>
    ) {

        super(photo);
    }

    add(newPhoto: Photo){
        return this.photo.save(newPhoto);

    }

    async deleteById(id: number){
        return await this.photo.delete(id);
    }
}    