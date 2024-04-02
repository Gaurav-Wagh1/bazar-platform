const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes/index");

const createServer = async () => {
  const app = express();

  app.use(morgan("combined"));
  app.use(cookieParser())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
  });
};

createServer();
