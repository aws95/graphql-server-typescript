import { ObjectType, Field, ID, ArgsType } from "type-graphql";
import { Product } from "../../Entities/Product";
import { Ref } from "../../types";

@ArgsType()
export class CartInputs {

  @Field((_type) => [ID])
  items!: Ref<Product>[];

  @Field((_type) => Number)
  count!: number;

  @Field((_type) => Number)
  total!: number;
}