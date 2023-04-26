const bcrypt = require("bcryptjs");
const MongoClient = require("mongodb").MongoClient;
const apiURL =
  "mongodb+srv://jlburks2:UFYK4nUkBie6r6P6@group8.xogz1tq.mongodb.net/Garden";

const saltRounds = 10;
const plainTextPassword = "orgCEditor";
const plainTextPassword1 = "orgC";
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
const hashedPassword1 = bcrypt.hashSync(plainTextPassword1, salt);

const uri = apiURL;
const client = new MongoClient(uri);

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
