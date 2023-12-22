const envs = require("./config/environments");
const { getConstants } = require("./database/manager");
const AuthRouter = require("./routes/router");
const Server = require("./server/server");

(() => {
  main();
})();

async function main() {
  try {
    await getConstants();
    new Server(envs.PORT, AuthRouter.routes).start();
  } catch (error) {
    console.error(error);
  }
}
