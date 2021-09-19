import { prop as Prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Product {
  @Field((_type) => ID)
  readonly _id!: string;

  @Field((_type) => String)
  @Prop({ type: () => String, required: true })
  name!: string;

  @Field((_type) => Number)
  @Prop({ type: () => Number, required: true })
  price!: number;

  @Field((_type) => Boolean)
  @Prop({ type: () => Boolean, required: true, default: false })
  inStock!: boolean;
}

export const ProductModel = getModelForClass(Product);
