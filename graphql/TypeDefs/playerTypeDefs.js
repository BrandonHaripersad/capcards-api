const { gql } = require("apollo-server");

module.exports = gql`
  type Player {
    name: String
    position: String
    yearsRemaining: String
    clauses: String
    status: String
    age: Int
    capPercentage: Float
    capHit: Float
  }

  input PlayerInput {
    name: String
    position: String
    yearsRemaining: String
    clauses: String
    status: String
    age: Int
    capPercentage: Float
    capHit: Float
  }

  type Query {
    player(ID: ID!): Player!
    getPlayers(amount: Int): [Player]
  }

  type Mutation {
    createPlayer(playerInput: PlayerInput): Player!
    deletePlayer(ID: ID!): Boolean
    editPlayer(ID: ID!, playerInput: PlayerInput): Boolean
  }
`;
