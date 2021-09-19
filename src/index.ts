import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { connect, ConnectOptions } from "mongoose";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./Resolvers/Product";
import { CartResolver } from "./Resolvers/Cart";
import { seedData } from "./helper";
import { BaseRedisCache } from "apollo-server-cache-redis";
import Redis from "ioredis";

type Port = number | undefined;
type Host = string | undefined;

const main = async () => {
  require("dotenv").config(__dirname, "../.env");
  const PORT = process.env.PORT;
  const MONGO_URL = process.env.MONGO_URL;
  const REDIS_PORT = parseInt(process.env.REDIS_PORT || "");
  const REDIS_HOST = process.env.REDIS_HOST;

  const mongooseConnection = await connect(`${MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  //const data = seedData();

  const schema = await buildSchema({
    resolvers: [ProductResolver, CartResolver],
  });

  const server = new ApolloServer({
    schema,
    cache: new BaseRedisCache({
      client: new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
      }),
    }),
  });

  server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
};

main().catch((err) => console.log(err));
