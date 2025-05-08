const { Schema, model, default: mongoose } = require("mongoose");

const PRIORITY_ENUM = ["Low", "Medium", "High"];

const taskSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  priority: {
    type: String,
    enum: {
      values: PRIORITY_ENUM,
      message: "Invalid priority `{VALUE}`. Allowed: Low, Medium, High",
      default: "Low",
    },
  },
  dueDate: { type: Date, default: Date },
  completed: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Task", taskSchema);
