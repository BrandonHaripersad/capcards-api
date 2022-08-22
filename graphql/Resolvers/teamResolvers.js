const Team = require("../../modules/Team");
const Player = require("../../modules/Player");

module.exports = {
  Query: {
    /*
    getTeams(amount)
    *** Get a list of teams by specifying the amount wanted, sorted by the most recently added teams.
    */
    async getTeams(_, { amount }) {
      return await Team.find().sort({ dateCreated: -1 }).limit(amount);
    },
    /*
    getTeambyName(name)
    *** Get the most recent version of a team by name.
    */
    async getTeambyName(_, { name }) {
      return await Team.find({ name: name }).sort({ dateCreated: -1 }).limit(1);
    },
  },
  Mutation: {
    /*
    createTeam(
      teamInput: {
        name,
        projCapHit,
        projLTIRUsed,
        projCapSpace,
        Players
      }
    )
    *** Create a new team using parameters in teamInput.
    */
    async createTeam(
      _,
      {
        teamInput: {
          name,
          projCapHit,
          projLTIRUsed,
          projCapSpace,
          positionalCap,
          players,
        },
      }
    ) {
      const createdTeam = new Team({
        name: name,
        projCapHit: projCapHit,
        projLTIRUsed: projLTIRUsed,
        projCapSpace: projCapSpace,
        players: players,
        positionalCap: positionalCap,
        dateCreated: new Date().toISOString(),
      });

      const res = await createdTeam.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    /*
    editTeam(
      ID,
      teamInput: {
        name,
        projCapHit,
        projLTIRUsed,
        projCapSpace,
        Players
      }
    )
    *** Edit a team using parameters in teamInput and find them by ID.
    */
    async editTeam(
      _,
      {
        ID,
        teamInput: {
          name,
          projCapHit,
          projLTIRUsed,
          projCapSpace,
          postionalCap,
          players,
        },
      }
    ) {
      const wasEdited = (
        await Team.updateOne(
          { _id: ID },
          {
            name: name,
            projCapHit: projCapHit,
            projLTIRUsed: projLTIRUsed,
            projCapSpace: projCapSpace,
            positionalCap: positionalCap,
            players: players,
          }
        )
      ).modifiedCount;
      return wasEdited;
      // 1 if something was deleted
      // 0 if something was not deleted
    },
    /*
    addPlayer(
      playerInput: {
        name,
        position,
        yearsRemaining,
        clauses,
        status,
        age,
        capPercentage,
        capHit,
      }
    )
    *** Add a new Player to the exhisting teams list of players using playerInput parameters.
    */
    async addPlayer(
      parent,
      {
        ID,
        playerInput: {
          name,
          position,
          yearsRemaining,
          clauses,
          status,
          age,
          capPercentage,
          capHit,
        },
      }
    ) {
      const createdPlayer = new Player({
        name: name,
        position: position,
        yearsRemaining: yearsRemaining,
        clauses: clauses,
        status: status,
        age: age,
        capPercentage: capPercentage,
        capHit: capHit,
      });

      const playerArray = await Team.findById({ _id: ID }).select(
        "players -_id"
      );

      const newPlayers = playerArray.players.concat(createdPlayer);

      const wasAdded = (
        await Team.updateOne(
          { _id: ID },
          {
            players: newPlayers,
          }
        )
      ).modifiedCount;

      return wasAdded;
    },
  },
};
