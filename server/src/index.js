require("dotenv").config();
const express=require("express");
const fs=require("fs");
const path=require("path");
const morgan=require("morgan");
const cors=require("cors");
const connectDB = require("./utils/db");
const guestRouter = require("./routes/guestRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const folioRouter = require("./routes/folioRoutes.js");
const roomRouter = require("./routes/roomRoutes.js");
const lostItemRouter=require("./routes/lostItemRoutes.js");
const inventoryRouter=require("./routes/inventoryRoutes.js");
const housekeepingstaffRouter=require("./routes/houseKeepingStaffRoutes.js");


const app=express();
const PORT=process.env.PORT;



app.use(express.json());


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }))


app.use(cors({
    origin:["http://localhost:5173","https://front-desk-fx1y.onrender.com"]
}));

connectDB();

app.use("/api/auth/",authRouter);
app.use("/api/guest/",guestRouter);
app.use("/api/folio/",folioRouter);
app.use("/api/room/",roomRouter);
app.use("/api/lost/",lostItemRouter);
app.use("/api/inventory",inventoryRouter);
app.use("/api/housekeepingstaff",housekeepingstaffRouter);



app.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}`)
});