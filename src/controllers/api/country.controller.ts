import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Country } from "../../../entities/country.entity";
import { CountryService } from "src/services/country/country.service";

@Controller('api/country')
@Crud({
    model: { type: Country },
    params: {
        id: { field: 'countryId', type: 'number', primary: true }
    },
    query: {
        join: {
          antikvitets: {
            eager: true
          }
        },
    },
})
export class CountryController {
    constructor(public service: CountryService) { }
}