const express = require("express");
const database = require("./config/database");
require("dotenv").config();

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

database.connect();

// Router ver 1
routesApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

