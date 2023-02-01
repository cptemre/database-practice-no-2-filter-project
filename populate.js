require("dotenv").config();
const gamesList = require("./gamesList.json");
const Games = require("./models/model");
const connectDB = require("./database/db");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Games.deleteMany();
    await Games.create(gamesList);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
