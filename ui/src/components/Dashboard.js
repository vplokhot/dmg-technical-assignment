import { React, useState, useEffect } from "react";
import { Container, Grid, Typography, Divider } from "@mui/material";
import instance from "api/axios";
import { DetailCard } from "components/DetailCard";
import { Analysis } from "./Analysis";
export const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    instance
      .get("/miningStats")
      .then((response) => {
        if (response.status === 200) {
          setStatistics(response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (statistics) {
    const { liveMiningStats, staticMiningStats } = statistics.data;
    const { activeMiners, miningRevenue, totalHashRate } = staticMiningStats;
    const { price, difficulty } = liveMiningStats[0];
    const antminerS1HashRateTHS = 95.47337585632621;

    const statsData = [
      {
        title: "Active Miners",
        subtitle: activeMiners,
      },
      {
        title: "Mining Revenue",
        subtitle: miningRevenue,
      },
      {
        title: "Total Hash Rate",
        subtitle: totalHashRate,
      },
      {
        title: "Price",
        subtitle: price,
      },
      {
        title: "Difficulty",
        subtitle: difficulty,
      },
    ];
    return (
      <Container sx={{ paddingTop: "80px" }}>
        <Typography variant="h4">Dashboard</Typography>
        <Grid container justifyContent="flex-start" alignItems="center" gap={2}>
          {statsData.map((data, index) => {
            const { title, subtitle } = data;
            return (
              <Grid item key={index}>
                <DetailCard title={title} subtitle={subtitle} />
              </Grid>
            );
          })}
        </Grid>
        <Divider sx={{ padding: "10px" }} variant="middle" />
        <Analysis
          difficulty={difficulty}
          minerData={{ hashRate: antminerS1HashRateTHS }}
        />
        {/* <Typography variant="h4">Analysis:</Typography>
        <Grid
          container
          // justifyContent="space-evenly"
          alignItems="center"
          gap={2}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Antminer S1:</Typography>
            Expected hashes in 10 days :{" "}
            {calculateExpectedHashes(95.47337585632621, 10)}{" "}
          </Grid>
          <Grid item xs={12}>
            Expected Bitcoins Mined in 10 days :{" "}
            {calculateExpectedBitcoinsMined(95.47337585632621, difficulty)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6"> Performance:</Typography>
            <br />
            yieldPercentage :{yieldPercentage} <br />
            averageHashrate :{averageHashrate} <br />
          </Grid>
        </Grid> */}
      </Container>
    );
  } else {
    return "Loading ...";
  }
};
// const calculateExpectedHashes = (hashrateTHs, days) => {
//   // Convert hashrate from TH/s to H/s
//   const hashrateHs = hashrateTHs * 1e12; // 1 TH = 1e12 H

//   const miningTimeSeconds = days * 24 * 60 * 60;

//   const expectedHashes = hashrateHs * miningTimeSeconds;

//   return expectedHashes;
// };

// function calculateExpectedBitcoinsMined(hashrateTHs, difficulty) {
//   const exaHash = 1e18; // One ExaHash (EH/s) is 10^18 hashes per second
//   const blocksPerDay = 144; // Number of Bitcoin blocks mined in a day

//   const expectedBitcoinsMined =
//     ((hashrateTHs * blocksPerDay) / (difficulty * exaHash)) * 10;

//   return expectedBitcoinsMined;
// }
// function calculateYieldAndAverageHashrate(
//   actualBitcoinsMined,
//   expectedBitcoinsMined,
//   difficulty,
//   blocksMined
// ) {
//   const exaHash = 1e18;

//   const yieldPercentage = (actualBitcoinsMined / expectedBitcoinsMined) * 100;

//   const averageHashrate =
//     (actualBitcoinsMined * difficulty * exaHash) / blocksMined;

//   return { yieldPercentage, averageHashrate };
// }
