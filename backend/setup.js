const { v4: uuidv4 } = require("uuid"); // Import the UUID library
const pool = require("./db");
const { MINER_DATA } = require("./data/minerData");

const setup = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await pool.query(
      `CREATE TABLE hardware(id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(100), location VARCHAR(100), hashrate VARCHAR(100))`
    );
    console.log("Hardware table created");

    await pool.query(
      `CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(100))`
    );
    console.log("Users table created");

    for (const hardware of MINER_DATA) {
      const hardwareId = uuidv4(); // Generate a new UUID

      await pool.query(
        `INSERT INTO hardware(id, name, location, hashrate) VALUES($1, $2, $3, $4)`,
        [hardwareId, hardware.name, hardware.location, hardware.hashrate]
      );

      console.log(`Inserted hardware: ${hardware.name}`);
    }
    console.log("DB setup complete ");
  } catch (e) {
    console.log(e, " setup error ...");
    return e;
  }
};
setup();
