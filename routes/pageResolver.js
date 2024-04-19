import express from "express";
import { resolve } from "path";

const pageResolverRouter = express.Router();

pageResolverRouter.get("/", (req, res) => {
  res.redirect("/login");
});

pageResolverRouter.get("/login", (req, res) => {
  res.sendFile(resolve("public/login.html"));
});

pageResolverRouter.get("/signup", (req, res) => {
  res.sendFile(resolve("public/signup.html"));
});

pageResolverRouter.get("/home", (req, res) => {
  res.sendFile(resolve("public/home.html"));
});

export default pageResolverRouter;
