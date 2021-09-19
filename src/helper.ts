import * as faker from "faker";
import { CartModel } from "./Entities/Cart";
import { ProductModel } from "./Entities/Product";

export const seedData = async () => {
  let items = [];
  let total = 0;
  for (const key in [...Array(5)]) {
    const product = new ProductModel({
      name: faker.name.firstName(),
      price: faker.commerce.price(),
      inStock: faker.datatype.boolean(),
    });
    const savedproduct = await product.save();
    total += savedproduct.price;
    items.push(savedproduct._id);
  }
  const cart = new CartModel({
    items,
    total,
    count: items.length,
  });
  const savedCart = await cart.save();
  return true;
};
