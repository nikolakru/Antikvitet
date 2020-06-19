import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Ingredient } from "../../../entities/ingredient.entity";
import { IngredientService } from "src/services/ingredient/ingredient.service";

@Controller('api/ingredient')
@Crud({
    model: { type: Ingredient },
    params: {
        id: { field: 'ingredientId', type: 'number', primary: true }
    },
    query: {
        join: {
            ingredientAntikvitets: {
            eager: true
          },
          antikvitets: {
            eager: true
          }
        },
    },
})
export class IngredientController {
    constructor(public service: IngredientService) { }
}