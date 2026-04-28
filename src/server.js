import {dbConnection} from "./config/database.js";
import 'dotenv/config.js'
import app from "express/lib/application.js"
import {syncModels} from "./model/index.js";

const startServer = async()=>{
    await dbConnection();
    await syncModels();
    app.listen(process.env.PORT || 8080, ()=>{
        console.log('Server is running on port 8080');
    })
}

startServer();