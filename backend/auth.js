// auth.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwt = require("jsonwebtoken");
const pool = require("./db");

// passport.use(
//   new JwtStrategy(jwtOptions, (jwt_payload, done) => {
//     // You would typically query your database for the user associated with jwt_payload.id
//     // For this example, we're not using a real database.
//     console.log(jwt_payload, " jwt_payload ");
//     const user = users.find((u) => u.id === jwt_payload.id);
//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   })
// );

const secretKey = "xxx"; // Replace with your own secret key

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      console.log("ATTEMPTING TO AUTHENTICATE ...", jwtPayload);
      const { id } = jwtPayload;
      // Query the database to find the user based on the ID in the token
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);

      if (rows.length === 1) {
        // User found, pass the user to the next middleware
        done(null, rows[0]);
      } else {
        // User not found, indicate failure
        done(null, false);
      }
    } catch (error) {
      // Handle any errors
      console.error("Error querying the database:", error);
      done(error, false);
    }
  })
);
// const users = [];

const register = async (username, password) => {
  try {
    // Check if the user already exists
    console.log("REGISTERING USER ...");
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return { success: false, message: "User already exists" };
    }

    // Insert the new user into the database
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    return { success: true, message: "Registration successful" };
  } catch (error) {
    console.log(error, "error");
    return {
      success: false,
      message: "Registration failed",
      error: error,
      test: "BIG TEST",
    };
  }
};

const login = async (username, password) => {
  try {
    console.log("login USER ...");

    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (user.rows.length === 1) {
      const token = jwt.sign(
        { id: user.rows[0].id, username: user.rows[0].username },
        secretKey
      );
      return { success: true, message: "Login successful", token, username };
    }
    return { success: false, message: "Invalid credentials" };
  } catch (error) {
    return { success: false, message: "Login failed" };
  }
};

module.exports = { register, login, passport };
