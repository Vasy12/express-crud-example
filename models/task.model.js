let primaryKey = 0;
const db = new Map();
class Task {
  /**
   *
   * @param {object} values
   * @param {string} values.value
   * @param {boolean} [values.isDone]
   * @param {string} values.deadline
   */
  constructor(values) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
    this.id = String(++primaryKey);
    this.createdAt = new Date();
  }

  update(values) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
    return Promise.resolve(this);
  }
}

// static create method
Task.create = function (values) {
  const newTask = new Task(values);
  db.set(newTask.id.toString(), newTask);
  return Promise.resolve(newTask);
};

// static find method
Task.findById = function (taskId) {
  return Promise.resolve(db.get(taskId));
};

// static method get all tasks
Task.findAll = function () {
  return Promise.resolve([...db.values()]);
};

Task.remove = function (taskId) {
  return Promise.resolve(db.delete(taskId));
};

module.exports = Task;

// set data to DB
db.set(
  String(++primaryKey),
  new Task({
    isDone: false,
    value: 'Test task 1',
    deadline: '2020-10-10 14:00',
  })
).set(
  String(++primaryKey),
  new Task({
    isDone: false,
    value: 'Test task 2',
    deadline: '2020-10-10 14:00',
  })
);
