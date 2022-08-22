const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const playerTypeDefs = require("./graphql/TypeDefs/playerTypeDefs");
const teamTypeDefs = require("./graphql/TypeDefs/teamTypeDefs");
const playerResolvers = require("./graphql/Resolvers/playerResolvers");
const teamResolvers = require("./graphql/Resolvers/teamResolvers");
const PostionalCapTypeDefs = require("./graphql/TypeDefs/postionalcapTypeDefs");
const PositionalCapResolvers = require("./graphql/Resolvers/postionalcapResolvers");

dotenv.config();

const MONGODB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cdw9z.mongodb.net/?retryWrites=true&w=majority`;

// Apollo Server
// TypeDefs: Type Definitions
// resolvers: How do we resolve queries / mutations

const types = [playerTypeDefs, teamTypeDefs, PostionalCapTypeDefs];
const resolvers = [playerResolvers, teamResolvers, PositionalCapResolvers];

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(types),
  resolvers: mergeResolvers(resolvers),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
