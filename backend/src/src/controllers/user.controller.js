const { response } = require("express");
const { getConnection } = require("../database/manager");

class UserController {
  static getUsers = async (_, res = response) => {
    return res.json({ body: await getConnection().select("*").from("users") });
  };
}

module.exports = UserController;
