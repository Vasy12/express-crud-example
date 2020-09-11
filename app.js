const express = require('express');
const { TaskController } = require('./controllers');
const { validateTask } = require('./middleware');
// create express app
const app = express();

app.use(express.json()); // parse Content-Type: application/json on all HTTP METHODS and all URI

// routing

app.post('/task', validateTask.validateTaskOnCreate, TaskController.createTask); // create
app.get('/tasks/:taskId', TaskController.getTask); //read
app.get('/tasks', TaskController.getAllTasks); // read all
app.patch(
  '/tasks/:taskId',
  validateTask.validateTaskOnUpdate,
  TaskController.updateTask
); //update
app.delete('/tasks/:taskId', TaskController.removeTask); //delete

module.exports = app;
