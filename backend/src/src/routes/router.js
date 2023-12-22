const { Router } = require("express");
const resolveClientDBConnection = require("../middlewares/db-connection");
const UserRoutes = require("./users/users.router");

class AuthRouter {
  static get routes() {
    const router = Router();

    router.get("/ping", (_, res) => {
      return res.json({ ok: true });
    });

    router.use(resolveClientDBConnection);

    router.use("/api/v1/users", UserRoutes.routes);

    return router;
  }
}

module.exports = AuthRouter;
