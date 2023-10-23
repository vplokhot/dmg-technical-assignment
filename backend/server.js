const express = require("express");
const pool = require("./db");
require("./setup");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const auth = require("./auth");
const { getStatistics } = require("./minerstat/api");
const { Miners } = require("./services/miners");

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.passport.initialize());

app.post("/register", async (req, res) => {
  console.log("registering user ...");
  const { username, password } = req.body;
  const result = await auth.register(username, password);
  res.json(result);
});

app.post("/login", async (req, res) => {
  console.log("Authenticating user ...");
  const { username, password } = req.body;
  const result = await auth.login(username, password);
  res.json(result);
});

app.get("/hardware", async (req, res) => {
  try {
    console.log("Getting hardware ...");
    const result = await Miners.getAllMiners();
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/miningStats", async (req, res) => {
  try {
    const data = await getStatistics();

    res.json({ data });
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new miner to the database
app.post(
  "/miners",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.body, "Creating miner ...");

      const { name, location, hashrate } = req.body;
      const result = await Miners.createMiner(name, location, hashrate);
      if (result.success) {
        res.status(201).json(result.data);
      }
    } catch (error) {
      console.error("Error creating miner:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update an existing miner by ID
app.put(
  "/miners/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.body, "Updating miner ...");

      const { id } = req.params;
      const { name, location, hashrate } = req.body;
      const result = await Miners.updateMiner(id, name, location, hashrate);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ error: "Miner not found" });
      }
    } catch (error) {
      console.error("Error updating miner:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a miner by ID
app.delete(
  "/miners/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Miners.deleteMiner(id);

      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(404).json({ error: "Miner not found" });
      }
    } catch (error) {
      console.error("Error deleting miner:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
