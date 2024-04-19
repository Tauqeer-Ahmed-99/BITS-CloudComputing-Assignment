import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import routeProtector from "./routes/routeProtector.js";
import pageResolverRouter from "./routes/pageResolver.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//protect routes
app.use(routeProtector);

// resolve html pages
app.use(pageResolverRouter);

app.listen(PORT, () => {
  console.log(`[Server] : Started at http://localhost:${PORT}`);
});
