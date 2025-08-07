require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB = require("./utils/db");
const guestRouter = require("./routes/guestRouter.js");
const authRouter = require("./routes/authRouter.js");

const app=express();
const PORT=process.env.PORT;

app.use(express.json());

app.use(cors({
    origin:["http://localhost:5173","https://front-desk-fx1y.onrender.com"]
}));

connectDB();

app.use("/api/auth/",authRouter);
app.use("/api/guest/",guestRouter);

app.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}`)
});