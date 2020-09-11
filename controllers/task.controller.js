const { Task } = require('./../models');

module.exports.createTask = async (req, res, next) => {
  const { body } = req;
  const createdTask = await Task.create(body);
  res.status(201).send(createdTask);
};
module.exports.getTask = async (req, res, next) => {
  const {
    params: { taskId },
  } = req;

  const task = await Task.findById(taskId);
  if (task) {
    return res.send(task);
  }
  res.status(404).send({
    message: `Task with id "${taskId}" not found`,
  });
};

module.exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.findAll();
  res.send(tasks);
};

module.exports.updateTask = async (req, res, next) => {
  const {
    params: { taskId },
    body,
  } = req;
  const task = await Task.findById(taskId);
  if (task) {
    const updatedTask = await task.update(body);
    res.send(updatedTask);
  }
  res.status(404).send({
    message: `Task with id "${taskId}" not found`,
  });
};
module.exports.removeTask = async (req, res, next) => {
  const {
    params: { taskId },
  } = req;

  if (await Task.remove(taskId)) {
    return res.status(204).send();
  }
  res.status(404).send({
    message: `Task with id "${taskId}" not found`,
  });
};
