import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Cart, CartModel } from "../Entities/Cart";
import { CartInputs } from "./types/Cart";

@Resolver()
export class CartResolver {
  @Query((returns) => [Cart])
  async getAllCarts() {
    return CartModel.find();
  }

  @Query((returns) => Cart)
  async getCartById(@Arg("_id", (type) => String) _id: String) {
    return CartModel.findById(_id);
  }

  @Mutation((returns) => Cart)
  async createCart(@Args() { items, count, total }: CartInputs) {
    const cart = await CartModel.create({
      items,
      count,
      total,
    });
    const savedCart = await cart.save();
    return savedCart;
  }
}
