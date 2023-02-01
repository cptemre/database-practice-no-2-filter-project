const Games = require("../models/model");

const getAll = async (req, res) => {
  const {
    id,
    names,
    developers,
    publishers,
    engines,
    platforms,
    years,
    genres,
    modes,
  } = req.query;
  const queries = {};

    if (id) {
      queries["_id"] = id
    }

  if (names) {
    queries.names = { $regex: names, $options: "gi" };
  }
  if (developers) {
    queries.developers = { $regex: developers, $options: "gi" };
  }
  if (publishers) {
    queries.publishers = { $regex: publishers, $options: "gi" };
  }
  if (engines) {
    queries.engines = { $regex: engines, $options: "gi" };
  }
  if (platforms) {
    queries.platforms = { $regex: platforms, $options: "gi" };
  }
  if (years) {
    let yearsSplit = years.split("-");
    queries.years = {
      $gte: Number(yearsSplit[0]),
      $lte: Number(yearsSplit[1]),
    };
    console.log(yearsSplit);
  }
  if (genres) {
    queries.genres = { $regex: genres, $options: "gi" };
  }
  if (modes) {
    queries.modes = { $regex: modes, $options: "gi" };
  }
  const pages = Number(req.query.pages) || 1;
  const size = Number(req.query.size) || 6;
  const limit = size * pages;

  let games = Games.find(queries);
  games = await games.limit(limit);
  const result = await games;
  if (!games)
    throw new Error("There are no games in our database at the moment.");
  res.json(result);
};

module.exports = { getAll };
