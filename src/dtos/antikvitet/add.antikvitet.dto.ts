import * as Validator from 'class-validator';
import { AntikvitetIngredientComponentDto } from './antikvitet.igredient. component.dto';

export class AddAntikvitetDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5,128)
    name: string;
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10,250)
    description: string;
    @Validator.IsNotEmpty()
    @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 2,
    })
    @Validator.IsPositive()
    price: number;
    @Validator.IsNotEmpty()
    @Validator.IsNumber({
    allowInfinity: false,
    allowNaN: false
     })
     @Validator.IsNotEmpty()
     @Validator.IsString()
     @Validator.Length(4,50)
    year: string;
    countryId: number;
    @Validator.IsOptional()
    @Validator.IsArray()
    @Validator.ValidateNested({
      always: true,
    })
    ingredients: AntikvitetIngredientComponentDto[] | null;
      
    
}