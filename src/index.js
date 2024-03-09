const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { PORT } = require("./config/server-config");
const apiRoutes = require("./routes/index");

const BookingService = require("./services/booking-service");
const booking = new BookingService();

const createServer = async () => {
  const app = express();

  app.use(morgan("combined"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);

    // console.log(await booking.createBooking(1));

    // const db = require("./models/index");
    // db.sequelize.sync({alter:true});
    // OrderDetail.sync({alter:true});
    // OrderItem.sync({alter:true});
    // PaymentDetail.sync({alter:true});

  });
};

createServer();
