import { Injectable } from "@nestjs/common";
import { Antikvitet } from "../../../entities/antikvitet.entity";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository, Any, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAntikvitetDto } from "../../dtos/antikvitet/add.antikvitet.dto";
import { ApiResponse } from "../../misc/api.response.class";

import { IngredientAntikvitet } from "../../../entities/ingredientAntikvitet.entity";
import { EditAntikvitetDto } from "src/dtos/antikvitet/edit.antikvitet.dto";
import { AntikvitetSearchDto } from "src/dtos/antikvitet/antikvitet.search.dto";






@Injectable()
export class AntikvitetService extends TypeOrmCrudService<Antikvitet> {
    constructor(
        @InjectRepository(Antikvitet)
         private readonly antikvitet: Repository<Antikvitet>,
        
        @InjectRepository(IngredientAntikvitet)
         private readonly ingredientAntikvitet: Repository<IngredientAntikvitet>,
            
        ){
            super(antikvitet);
        }
        async createFullAntikvitet( data: AddAntikvitetDto): Promise<Antikvitet | ApiResponse> {
            let newAntikvitet: Antikvitet = new Antikvitet();
            newAntikvitet.name = data.name;
            newAntikvitet.description = data.description;
            newAntikvitet.countryId = data.countryId;
            newAntikvitet.year = data.year;
            newAntikvitet.price = data.price;

           let savedAntikvitet = await this.antikvitet.save(newAntikvitet);

           for ( let ingredient of data.ingredients) {
               let newIngredientAntikvitet = new IngredientAntikvitet();
               newIngredientAntikvitet.antikvitetId = savedAntikvitet.antikvitetId;
                newIngredientAntikvitet.ingredientId = ingredient.igredientId;
               await  this.ingredientAntikvitet.save(newIngredientAntikvitet);
           }
                return await this.antikvitet.findOne(savedAntikvitet.antikvitetId, {
               relations: [
                   
                   "ingredients"

               ]
           });
        
    }
    
    async editAntikvitet(antikvitetId: number, data: EditAntikvitetDto): Promise<Antikvitet | ApiResponse> {
        const existingAntikvitet: Antikvitet = await this.antikvitet.findOne(antikvitetId,
            {
                relations: ['ingredients']
            });

        if(!existingAntikvitet){
            return new ApiResponse('error', -5001, 'Antikvitet not found');

        }
        existingAntikvitet.name = data.name;
        existingAntikvitet.description = data.description;
        existingAntikvitet.price = Math.round(data.price);
        existingAntikvitet.year = data.year;
        existingAntikvitet.countryId = data.countryId;

        const savedAntikvitet = await this.antikvitet.save(existingAntikvitet);

        if(!savedAntikvitet){
            return new ApiResponse('error', -5002, 'Could not save new antikvitet data. ');

        }

        if(data.ingredients !== null){
            await this.ingredientAntikvitet.remove(existingAntikvitet.ingredientAntikvitets)

      for (let ingredient of data.ingredients) {
        let newIngredientAntikvitet: IngredientAntikvitet = new IngredientAntikvitet()
        newIngredientAntikvitet.antikvitetId = antikvitetId;
        newIngredientAntikvitet.ingredientId = ingredient.igredientId;

        await this.ingredientAntikvitet.save(newIngredientAntikvitet);
      }

    }
    return await this.antikvitet.findOne(antikvitetId, {
        relations: [
        "ingredients",
        "photos"

    ]
});
    }

      async search(data: AntikvitetSearchDto): Promise<Antikvitet[]>{
          const builder = await this.antikvitet.createQueryBuilder("antikvitet");

          builder.where('year = :year', {year: data.year} );

          if(data.keywords && data.keywords.length > 0){
              builder.andWhere( `(name LIKE :kw OR 
                                description LIKE :kw)`, 
                                { kw: '%' + data.keywords.trim() + '%'});

          }
          if (data.priceMin && typeof  data.priceMin === 'number'){
              builder.andWhere('price >= :min', { min: data.priceMin});
          }
          if (data.priceMax && typeof data.priceMax === 'number'){
            builder.andWhere('price <= :max', { max: data.priceMax});
        }

        let orderBy = 'name';
        let orderDirection: 'ASC' | 'DESC' = 'ASC';

        if( data.orderBy){
            orderBy = data.orderBy;

            if(orderBy === 'price'){
                orderBy = 'price'
            }
            if(orderBy === 'name'){
                orderBy = 'antikvitet.name'
            }
        }
        if(data.orderDirection){
            orderDirection = data.orderDirection;
        }

        builder.orderBy(orderBy, orderDirection);

        let page = 0;
        let perPage: 5 | 10 | 25 | 50 | 75 = 25;

        if(data.page && typeof data.page === 'number'){
            page = data.page;
        }

        if(data.itemsPerPage && typeof data.itemsPerPage === 'number'){
            perPage = data.itemsPerPage;
        }

        builder.skip(page * perPage);
        builder.take(perPage);

        let antikvitetIds = await (await builder.getMany()).map(antikvitet => antikvitet.antikvitetId);


        return await this.antikvitet.find({
            where: { antikvitetId: In(antikvitetIds) },
            relations: [
                "ingredients",
                "photos"
                
            ]
        });
      }  

            
}
    
             
            
        
    

  

