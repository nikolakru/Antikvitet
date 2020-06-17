export class AddAntikvitetDto {
    name: string;
    description: string;
    price: number;
    year: number;
    countryId: number;
    ingredients: {
        ingredientId: number;
      }[];
      
    
}