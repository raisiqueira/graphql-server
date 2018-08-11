import { gql } from "apollo-server-express";
import userModels from "../models";

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
  }

  type Query {
    users: [User]
  }

  input CreateUserInput {
    id: Int
    name: String
    age: Int
    email: String
    friends: [Int]
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }
`;

export const resolvers = {
  Query: {
    users() {
      return userModels.list();
    }
  },
  User: {
    friends(source) {
      if (!source.friends || !source.friends.length) {
        return;
      }
      return Promise.all(source.friends.map(({ id }) => userModels.find(id)));
    }
  },

  Mutation: {
    createUser(source, args) {
      return userModels.create(args.input);
    }
  }
};
