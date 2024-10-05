const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use('/api', userRouter);

app.listen(PORT, async () => {
    try{
        await connectDb(DB_URL);
        console.log(`Server is runing at : http://localhost:${PORT}`);
    }catch(err) {
        console.log(err);
    }
})