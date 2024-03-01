const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server-config");
const { User, OrderDetail } = require("./models/index");

const apiRoutes = require('./routes/index');

const createServer = async () => {
  const app = express();

  morgan("combined");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    // User.sync({ alter: true });
    // await User.destroy({
    //   where:{
    //     id:1
    //   }
    // });
  });
};

createServer();
