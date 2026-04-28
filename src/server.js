import {dbConnection} from "./config/database.js";
import 'dotenv/config.js'
import {syncModels} from "./model/index.js";
import express from "express";
import bookRouter from "./routes/book.routes.js";

const app = express();
app.use(express.json());
app.use(bookRouter)

const startServer = async () => {
    await dbConnection();
    await syncModels();
    app.listen(process.env.PORT || 8080, () => {
        console.log('Server is running on port 8080');
    })
}

startServer();