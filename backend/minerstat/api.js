const { default: axios } = require("axios");
const { MINING_STATS } = require("../data/miningStats");

const baseUrl = "https://api.minerstat.com/v2/coins";

const getStatistics = async () => {
  try {
    const { data } = await axios.get(baseUrl + "?list=BTC");
    return { liveMiningStats: data, staticMiningStats: MINING_STATS };
  } catch (e) {
    console.log(e, " Minerstat api error");
    return e;
  }
};

module.exports = { getStatistics };
