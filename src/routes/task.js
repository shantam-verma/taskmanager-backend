const express = require("express");
const auth = require("../middleware/auth");
const {
  viewAllTasks,
  createNewTask,
  viewSingleTask,
  deleteSingleTask,
} = require("../controller/taskController");
const taskRouter = express.Router();
taskRouter.use(express.json());

taskRouter.post("/create", auth, createNewTask);

taskRouter.get("/view", auth, viewAllTasks);

taskRouter.get("/view/:id", auth, viewSingleTask);

taskRouter.delete("/delete/:id", auth, deleteSingleTask);

module.exports = taskRouter;
