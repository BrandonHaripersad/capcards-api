const { gql } = require("apollo-server");

module.exports = gql`
  type Team {
    name: String
    projCapHit: Int
    projLTIRUsed: Int
    projCapSpace: Int
    positionalCap: [PositionalCap]
    players: [Player]
    dateCreated: String
  }

  input TeamInput {
    name: String
    projCapHit: Int
    projLTIRUsed: Int
    projCapSpace: Int
    positionalCap: [PositionalCapInput]
    players: [PlayerInput]
  }

  type Query {
    getTeams(amount: Int): [Team]
    getTeambyName(name: String): [Team]
  }

  type Mutation {
    createTeam(teamInput: TeamInput): Team!
    editTeam(ID: ID!, teamInput: TeamInput): Boolean
    addPlayer(ID: ID!, playerInput: PlayerInput): Boolean
  }
`;
