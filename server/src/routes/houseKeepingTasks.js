const express=require("express");
const { addTask } = require("../controllers/houseKeepingTaskController");
const {updateTaskStatus}=require("../controllers/houseKeepingTaskController")
const verifyToken=require("../middlewares/verifyToken")

const router=express.Router();

router.post("/addTask/",addTask);
router.put("/task/:taskId",verifyToken,updateTaskStatus);

module.exports=router;