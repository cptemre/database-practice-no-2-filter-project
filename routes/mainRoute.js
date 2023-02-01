const express = require("express");
const Router = express.Router();

const { getAll } = require("../controls/mainRoute");

Router.route("/").get(getAll);

module.exports = Router;
