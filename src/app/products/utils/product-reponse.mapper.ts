import * as moment from "moment";
import { Product } from "../data-access/models/product";

export class ProductResponseMapper {
    static fromResponse(response: Product) {
        return {
            id: response.id,
            name: response.name,
            description: response.description,
            logo: response.logo,
            date_release: moment(response.date_release).add(1, 'day').format('DD-MM-YYYY') ,
            date_revision: moment(response.date_revision).add(1, 'day').format('DD-MM-YYYY'),
        };
    }
}