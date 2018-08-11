import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schemas";
const PORT = process.env.PORT || 3500;

const app = express();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true
});

server.applyMiddleware({ app });

app.get("/", (req, res) => {
  res.send({ msg: "hello!" });
});

app.listen(PORT, () => `rodando: http://localhost:${PORT}`);
