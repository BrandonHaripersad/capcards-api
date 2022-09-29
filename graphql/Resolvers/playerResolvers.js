const Player = require("../../modules/Player");

module.exports = {
  Query: {
    async player(_, { ID }) {
      return await Player.findById(ID);
    },
    async getPlayers(_, { amount }) {
      return await Player.find().limit(amount);
    },
  },
  Mutation: {
    async createPlayer(
      _,
      {
        playerInput: {
          name,
          position,
          yearsRemaining,
          clauses,
          status,
          injury,
          age,
          capPercentage,
          capHit,
          link,
          transactionLink,
        },
      }
    ) {
      const createdPlayer = new Player({
        name: name,
        position: position,
        yearsRemaining: yearsRemaining,
        clauses: clauses,
        status: status,
        injury: injury,
        age: age,
        capPercentage: capPercentage,
        capHit: capHit,
        link: link,
        transactionLink: transactionLink,
      });

      const res = await createdPlayer.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deletePlayer(_, { ID }) {
      const wasDeleted = (await Player.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
      // 1 if something was deleted
      // 0 if something was not deleted
    },
    async editPlayer(
      _,
      {
        ID,
        playerInput: {
          name,
          position,
          yearsRemaining,
          clauses,
          status,
          injury,
          age,
          capPercentage,
          capHit,
          link,
          transactionLink,
        },
      }
    ) {
      const wasEdited = (
        await Player.updateOne(
          { _id: ID },
          {
            name: name,
            position: position,
            yearsRemaining: yearsRemaining,
            clauses: clauses,
            status: status,
            injury: injury,
            age: age,
            capPercentage: capPercentage,
            capHit: capHit,
            link: link,
            transactionLink: transactionLink,
          }
        )
      ).modifiedCount;
      return wasEdited;
      // 1 if something was deleted
      // 0 if something was not deleted
    },
  },
};
