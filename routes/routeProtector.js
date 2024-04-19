import express from "express";

const availbleRoutes = ["/", "/login", "/signup", "/home"];

const routeProtector = express.Router();

routeProtector.use((req, res, next) => {
  if (availbleRoutes.includes(req.path.split("?")[0])) {
    next();
  } else {
    res.redirect("/");
  }
});

export default routeProtector;
