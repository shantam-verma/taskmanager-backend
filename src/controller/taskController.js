const Task = require("../models/task");

const createNewTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
      owner: _id,
      title,
      description,
      priority,
      dueDate,
      completed,
    });
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const viewAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const task = await Task.find({ owner: _id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const viewSingleTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, owner: _id });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSingleTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, owner: _id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or already deleted",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Task successfully deleted" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  viewAllTasks,
  createNewTask,
  viewSingleTask,
  deleteSingleTask,
};
