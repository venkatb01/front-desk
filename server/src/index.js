require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB = require("./utils/db");
const guestRouter = require("./routes/guestRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const folioRouter = require("./routes/folioRoutes.js");
const roomRouter = require("./routes/roomRoutes.js");
const maintainanceRouter=require("./routes/maintainanceRoutes.js");
const inventoryRouter=require("./routes/inventoryRoutes.js")

const app=express();
const PORT=process.env.PORT;

app.use(express.json());

app.use(cors({
    origin:["http://localhost:5173","https://front-desk-fx1y.onrender.com"]
}));

connectDB();

app.use("/api/auth/",authRouter);
app.use("/api/guest/",guestRouter);
app.use("/api/folio/",folioRouter);
app.use("/api/room/",roomRouter);
app.use("/api/room/maintainance",maintainanceRouter);
app.use("/api/inventory",inventoryRouter);

app.listen(PORT,()=>{
    console.log(`Server started running at http://localhost:${PORT}`)
});