// core modules
const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}./../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedTime: req.requestTime,
    data: {
      users,
    },
  });
};
exports.postUsers = (req, res) => {
  const newUser = Object.assign(req.body);
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({
          message: "Can't process your request",
        });
      }
      res.status(201).json({
        message: 'Created new user 🙋‍♂️',
        createdTime: req.requestTime,
        newUser: newUser,
      });
    }
  );
};
exports.getUsersById = (req, res) => {
  const id = req.params.id;
  const user = users.find((el) => el._id === id);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    requestedTime: req.requestTime,
    data: {
      user,
    },
  });
};
