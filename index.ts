import express, {Express, Request, Response} from "express";
import dotenv from "dotenv"; 
import * as database from "./config/database"; // * : lay toan bo cac ham trong database
import mainV1Routes from "./api/v1/routes/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

mainV1Routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
