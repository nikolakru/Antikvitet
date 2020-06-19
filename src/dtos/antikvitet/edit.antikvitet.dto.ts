export class EditAntikvitetDto {
    name: string;
    description: string;
    price: number;
    year: number;
    countryId: number;
    ingredients: {
        ingredientId: number;
        
      }[] | null;
      
    
}