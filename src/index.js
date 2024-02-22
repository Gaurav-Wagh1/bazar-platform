const express = require("express");
const morgan = require('morgan');

const { PORT } = require("./config/server-config");

const createServer = async () => {
    const app = express();

    morgan('combined');

    app.listen(PORT, ()=>{
        console.log(`Server started at port ${PORT}`);
    });
};

createServer();
