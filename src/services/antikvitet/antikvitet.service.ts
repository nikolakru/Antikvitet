import { Injectable } from "@nestjs/common";
import { Antikvitet } from "../../../entities/antikvitet.entity";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddAntikvitetDto } from "../../dtos/antikvitet/add.antikvitet.dto";
import { ApiResponse } from "../../misc/api.response.class";

import { IngredientAntikvitet } from "../../../entities/ingredientAntikvitet.entity";
import { EditAntikvitetDto } from "src/dtos/antikvitet/edit.antikvitet.dto";






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
            newAntikvitet.descripton = data.description;
            newAntikvitet.countryId = data.countryId;
            newAntikvitet.year = data.year;
            newAntikvitet.price = data.price;

           let savedAntikvitet = await this.antikvitet.save(newAntikvitet);

           for ( let ingredient of data.ingredients) {
               let newIngredientAntikvitet = new IngredientAntikvitet();
               newIngredientAntikvitet.antikvitetId = savedAntikvitet.antikvitetId;
                newIngredientAntikvitet.ingredientId = ingredient.ingredientId;
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
        existingAntikvitet.descripton = data.description;
        existingAntikvitet.price = data.price;
        existingAntikvitet.year = Math.round(data.price)
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
        newIngredientAntikvitet.ingredientId = ingredient.ingredientId;

        await this.ingredientAntikvitet.save(newIngredientAntikvitet);
      }

    }
    return await this.antikvitet.findOne(antikvitetId, {
        relations: [
        "ingredients"

    ]
});
    }
        
            
}
    
             
            
        
    

  

