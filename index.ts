import express, {Express, Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import * as database from "./config/database"; // * : lay toan bo cac ham trong database
import mainV1Routes from "./api/v1/routes/index.route";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mainV1Routes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
