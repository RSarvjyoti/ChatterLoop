const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.listen(PORT, async () => {
    try{
        await connectDb(DB_URL);
        console.log(`Server is runing at : http://localhost:${PORT}`);
    }catch(err) {
        console.log(err);
    }
})