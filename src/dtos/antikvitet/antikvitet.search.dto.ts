import * as Validator from 'class-validator';
import { AntikvitetSearchDeatureComponentDto } from './antikvitet.search.ingredient.component';



export class AntikvitetSearchDto {
    @Validator.IsOptional()
    @Validator.IsNotEmpty()
    @Validator.Length(2, 128)
    keywords: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Matches(/[0-9]/g)
    @Validator.Length(4,50)
    
    year:string;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
        
    })
    priceMin: number;

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber(
        {
            allowInfinity: false,
            allowNaN: false,
            maxDecimalPlaces: 2,
            
        }
    )
    priceMax: number;

    ingredients: AntikvitetSearchDeatureComponentDto[];

    @Validator.IsOptional()
    @Validator.IsIn(['name', 'price'])
    orderBy: 'name' | 'price';

    @Validator.IsOptional()
    @Validator.IsIn(['ASC', 'DESC'])
    orderDirection: 'ASC' | 'DESC';
    
    @Validator.IsOptional()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0, 
    })
    @Validator.IsPositive()
    page: number;
    @Validator.IsOptional()
    @Validator.IsIn([5, 10, 25, 50, 75])
    itemsPerPage: 5 | 10 | 25 | 50 | 75;
    
}