import * as moment from "moment";
import { Product } from "../data-access/models/product";

export class ProductResponseMapper {
    static fromResponse(response: Product) {
        return {
            id: response.id,
            name: response.name,
            description: response.description,
            logo: response.logo,
            date_release: moment(response.date_release).format('YYYY-MM-DD'),
            date_revision: moment(response.date_revision).format('YYYY-MM-DD'),
        };
    }
}