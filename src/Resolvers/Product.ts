import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Product, ProductModel } from "../Entities/Product";

@Resolver()
export class ProductResolver {
  @Query((returns) => [Product])
  async getAllProducts() {
    return ProductModel.find();
  }

  @Query((returns) => Product)
  async getProductById(@Arg("_id", (type) => String) _id: String) {
    return ProductModel.findById(_id);
  }
}
