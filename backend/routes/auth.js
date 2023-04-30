const bcrypt = require("bcryptjs");
const MongoClient = require("mongodb").MongoClient;
const apiURL =
  "mongodb+srv://jlburks2:UFYK4nUkBie6r6P6@group8.xogz1tq.mongodb.net/Garden";

// Set the number of salt rounds to use for password hashing
const saltRounds = 10;

// Set the plain text passwords to be hashed
const plainTextPassword = "orgCEditor";
const plainTextPassword1 = "orgC";

// Generate a salt to use for password hashing
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the plain text passwords using the generated salt
const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
const hashedPassword1 = bcrypt.hashSync(plainTextPassword1, salt);

// Hash the plain text passwords using the generated salt
const uri = apiURL;

// Create a new MongoClient object using the connection URL
const client = new MongoClient(uri);

// Hash the plain text passwords using the generated salt
async function run() {
  try {
    await client.connect();
    const collection = client.db("Garden").collection("org");
    await collection.insertOne({
      _id: 3,
      name: "OrganizationC",
      credentials: {
        editor: {
          username: "orgCEditor",
          password: hashedPassword,
        },
        viewer: {
          username: "orgC",
          password: hashedPassword1,
        },
      },
    });
  } finally {
    await client.close();
  }
}

run();
