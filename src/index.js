const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server-config");

const apiRoutes = require("./routes/index");

const createServer = async () => {
  const app = express();

  app.use(morgan("combined"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    // await Subcategory.sync({alter:true});
  });
};

createServer();
