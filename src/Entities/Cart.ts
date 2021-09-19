import { prop as Prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Ref } from "../types";
import { Product } from "./Product";

@ObjectType()
export class Cart {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field((_type) => [ID])
  @Prop({ ref: () => Product, required: true, default: [] })
  items!: Ref<Product>[];

  @Field((_type) => Number)
  @Prop({ type: () => Number, required: true, default: 0 })
  count!: number;

  @Field((_type) => Number)
  @Prop({ type: () => Number, required: true, default: 0 })
  total!: number;
}

export const CartModel = getModelForClass(Cart);
