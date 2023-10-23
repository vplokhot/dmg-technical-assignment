import { Grid, Typography } from "@mui/material";
import { DetailCard } from "./DetailCard";
const calculateExpectedHashes = (hashrateTHs, days) => {
  // Convert hashrate from TH/s to H/s
  const hashrateHs = hashrateTHs * 1e12; // 1 TH = 1e12 H

  const miningTimeSeconds = days * 24 * 60 * 60;

  const expectedHashes = hashrateHs * miningTimeSeconds;

  return expectedHashes;
};

function calculateExpectedBitcoinsMined(hashrateTHs, difficulty) {
  const exaHash = 1e18; // One ExaHash (EH/s) is 10^18 hashes per second
  const blocksPerDay = 144; // Number of Bitcoin blocks mined in a day

  const expectedBitcoinsMined =
    ((hashrateTHs * blocksPerDay) / (difficulty * exaHash)) * 10;

  return expectedBitcoinsMined;
}
function calculateYieldAndAverageHashrate(
  actualBitcoinsMined,
  expectedBitcoinsMined,
  difficulty,
  blocksMined
) {
  const exaHash = 1e18;

  const yieldPercentage = (actualBitcoinsMined / expectedBitcoinsMined) * 100;

  const averageHashrate =
    (actualBitcoinsMined * difficulty * exaHash) / blocksMined;

  return { yieldPercentage, averageHashrate };
}

export const Analysis = ({ difficulty, minerData }) => {
  const { hashRate } = minerData;
  const expectedBitcoinRewardThreshold = 1;

  const expectedBitcoinReward = calculateExpectedBitcoinsMined(
    hashRate,
    difficulty
  );

  const { yieldPercentage, averageHashrate } = calculateYieldAndAverageHashrate(
    expectedBitcoinRewardThreshold,
    expectedBitcoinReward,
    difficulty,
    144 * 10
  );
  return (
    <>
      <Typography variant="h4">Analysis:</Typography>
      <Grid container alignItems="center" gap={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Antminer S1:</Typography>
          <DetailCard
            title={" Expected hashes in 10 days"}
            subtitle={calculateExpectedHashes(hashRate, 10)}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailCard
            title={"Expected Bitcoins Mined in 10 days"}
            subtitle={calculateExpectedBitcoinsMined(hashRate, difficulty)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6"> Performance:</Typography>
          <DetailCard title={"Yield Percentage"} subtitle={yieldPercentage} />
          <DetailCard title={"Average HashRate"} subtitle={averageHashrate} />
        </Grid>
      </Grid>
    </>
  );
};
