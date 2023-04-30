const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
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
      // If no matching document is found, return a 401 Unauthorized status
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
        // If the password matches, set a global variable and send back the username and orgName
        globals.setGlobalVariable(data._id);
        res.json({ username: user, orgName: data.name });
      } else {
        // If the password doesn't match, return a 401 Unauthorized status
        res.status(401).send("Invalid username or password");
      }
    }
  } catch (error) {
    // If an error occurs, log the error and call the error-handling middleware
    console.log(`${error} here!!!!!!`);
    return next(error);
  }
});

module.exports = router;
