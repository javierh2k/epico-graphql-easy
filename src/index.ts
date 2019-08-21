import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";
import { seedDatabase } from "./seeds";
import { Context } from "./modules/rate/input/context";

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: "mysql",
      database: "admin-epico",
      username: "root", // fill this with your username
      password: "admin", // and password
      port: 3306, //5432,
      host: "db",
      //entities: [Recipe, Rate, User],
      entities: [
        __dirname + "/modules/**/*.entity.ts"
      ],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: true,
      cache: true,

      // type: env.db.type as any, // See createConnection options for valid types
      // host: env.db.host,
      // port: env.db.port,
      // username: env.db.username,
      // password: env.db.password,
      // database: env.db.database,
      // synchronize: env.db.synchronize,
      // logging: 'all',
      // entities: [
      //   __dirname + "/modules/**/*.entity.ts"
      // ],
      // logger: "advanced-console",
      // cache: true,
    });

    // seed database with some data
    const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [__dirname + "/modules/**/*.resolver.ts"],
      container: Container,
    });

    // create mocked context
    const context: Context = { user: defaultUser };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
