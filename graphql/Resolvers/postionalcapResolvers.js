const PositionalCap = require("../../modules/PositionalCap");

module.exports = {
  Mutation: {
    async createPositionalCap(
      _,
      { positionalCapInput: { postion, percentage, rank } }
    ) {
      const createdPostionalCap = new PositionalCap({
        position: postion,
        percentage: percentage,
        rank: rank,
      });

      const res = await createdPostionalCap.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
  },
};
