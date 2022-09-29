const { gql } = require("apollo-server");

module.exports = gql`
  type Player {
    name: String
    position: String
    yearsRemaining: String
    clauses: String
    status: String
    injury: String
    age: Int
    capPercentage: Float
    capHit: Float
    link: String
    transactionLink: String
  }

  input PlayerInput {
    name: String
    position: String
    yearsRemaining: String
    clauses: String
    status: String
    injury: String
    age: Int
    capPercentage: Float
    capHit: Float
    link: String
    transactionLink: String
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
