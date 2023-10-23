const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

const createMiner = async (name, location, hashrate) => {
  try {
    const hardwareId = uuidv4();

    const result = await pool.query(
      "INSERT INTO hardware (id, name, location, hashrate) VALUES ($1, $2, $3, $4) RETURNING *",
      [hardwareId, name, location, hashrate]
    );

    return { success: true, data: result.rows[0] };
  } catch (e) {
    console.error("Error creating miner : ", e);
    return { success: false, data: e };
  }
};

const getMiner = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM hardware WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 1) {
      return { success: true, data: result.rows[0] };
    }
  } catch (error) {
    console.error("Error retrieving miner:", error);
    return { success: false, data: error };
  }
};
const updateMiner = async (id, name, location, hashrate) => {
  try {
    const result = await pool.query(
      "UPDATE hardware SET name = $1, location = $2, hashrate = $3 WHERE id = $4 RETURNING *",
      [name, location, hashrate, id]
    );
    if (result.rows.length === 1) {
      return { success: true, data: result.rows[0] };
    }
  } catch (error) {
    console.error("Error retrieving miner:", error);
    return { success: false, data: error };
  }
};
const deleteMiner = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM hardware WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 1) {
      return { success: true, data: result.rows[0] };
    }
  } catch (error) {
    console.error("Error deleting miner:", error);
    return { success: false, data: error };
  }
};

const getAllMiners = async () => {
  try {
    console.log("Getting all miners ...");
    const result = await pool.query("SELECT * FROM hardware");
    return result.rows;
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    return { error: "Internal server error" };
  }
};

module.exports.Miners = {
  createMiner,
  getMiner,
  updateMiner,
  deleteMiner,
  getAllMiners,
};
