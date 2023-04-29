const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
// let org = process.env.ORG;
// const org = "2";
let globals = require("./globals");

let org = globals.getGlobalVariable();

// importing data model schemas
const { orgs } = require("../models/models");

router.get("/", (req, res, next) => {
  orgs.find({}, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// router.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     // Check if username is not empty or null
//     if (!username) {
//       return res.status(400).send("Username is required");
//     }
//     // Query the database for a document that matches the given username field
//     const data = await orgs.findOne({
//       $or: [
//         { "credentials.editor.username": username },
//         { "credentials.viewer.username": username },
//       ],
//     });
//     if (!data) {
//       res.status(401).send("Invalid username or password");
//     } else {
//       // Check if the password matches the hashed password in the database
//       let passwordMatch = false;
//       if (data.credentials.editor.username === username) {
//         passwordMatch = await bcrypt.compare(
//           password,
//           data.credentials.editor.password
//         );
//       } else if (data.credentials.viewer.username === username) {
//         passwordMatch = password === data.credentials.viewer.password;
//       }
//       if (passwordMatch) {
//         globals.setGlobalVariable(data._id);
//         // Send back the data if username and password match
//         console.log(data);
//         res.json(data);
//       } else {
//         res.status(401).send("Invalid username or password");
//       }
//     }
//   } catch (error) {
//     console.log(`${error} here!!!!!!`);
//     return next(error);
//   }
// });

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Check if username is not empty or null
    if (!username) {
      return res.status(400).send("Username is required");
    }
    // Query the database for a document that matches the given username field
    const dataEditor = await orgs.findOne({
      "credentials.editor.username": username,
    });
    const dataViewer = await orgs.findOne({
      "credentials.viewer.username": username,
    });
    const data = dataEditor || dataViewer || null;
    if (!data) {
      res.status(401).send("Invalid username or password");
    } else {
      // Check if the password matches the hashed password in the database
      let passwordMatch = false;
      let user = null;
      if (data.credentials.editor.username === username) {
        passwordMatch = await bcrypt.compare(
          password,
          data.credentials.editor.password
        );
        user = data.credentials.editor.username;
      } else if (data.credentials.viewer.username === username) {
        let regPasswordMatch = password === data.credentials.viewer.password;
        passwordMatch = regPasswordMatch;
        user = data.credentials.viewer.username;
      }
      if (passwordMatch) {
        globals.setGlobalVariable(data._id);
        // Send back the username if username and password match
        res.json({ username: user });
      } else {
        res.status(401).send("Invalid username or password");
      }
    }
  } catch (error) {
    console.log(`${error} here!!!!!!`);
    return next(error);
  }
});
module.exports = router;

module.exports = router;
