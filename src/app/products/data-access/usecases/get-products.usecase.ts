import { Observable } from "rxjs";
import { UseCase } from "../../utils/use-case";
import { Product } from "../models/product";
import { ProductRepository } from "../repositories/product.repository";

 
export class GetProductsUseCase implements UseCase<void, Product[]> {
  constructor(private productRepository: ProductRepository) {}

  execute(): Observable<Product[]> {
    return this.productRepository.getProducts();
  }
}