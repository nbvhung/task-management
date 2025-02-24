const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
require("dotenv").config();

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

app.use(cors());

database.connect();

app.use(cookieParser("ILFHIALFHIAEU"));

// parse application/json
app.use(bodyParser.json()); // lấy dữ liệu trong body 

// Router ver 1
routesApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

