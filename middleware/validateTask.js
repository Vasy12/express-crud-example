const yup = require('yup');

const TASK_CREATE_SCHEMA = yup.object({
  value: yup.string().trim().required(),
  isDone: yup.boolean().required(),
  deadline: yup.date().required(),
});

const TASK_UPDATE_SCHEMA = yup.object({
  value: yup.string().trim(),
  isDone: yup.boolean(),
  deadline: yup.date(),
});

module.exports.validateTaskOnCreate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await TASK_CREATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

module.exports.validateTaskOnUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    req.body = await TASK_UPDATE_SCHEMA.validate(body);
    next();
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
