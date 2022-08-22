const { gql } = require("apollo-server");

module.exports = gql`
  type PositionalCap {
    position: String
    percentage: Float
    rank: Int
  }

  input PositionalCapInput {
    position: String
    percentage: Float
    rank: Int
  }

  type Mutation {
    createPositionalCap(positionalCapInput: PositionalCapInput): PositionalCap!
  }
`;
