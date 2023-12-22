const envs = {
  PORT: parseInt(process.env.PORT || "3000"),
  HOST_DB: process.env.HOST_DB || "localhost",
  PORT_DB: parseInt(process.env.HOST_DB || "3306"),
  USERNAME_DB: process.env.USERNAME_DB || "",
  PASSWORD_DB: process.env.PASSWORD_DB || "",
  NAME_DB: process.env.NAME_DB || "",
};

module.exports = envs;
