const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`./dev-data/data/users.json`, 'utf-8'));

exports.getAllUsers = (req, res) => {
  res.status(200).send({
    message: 'success',
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = {id: newId, ...req.body};
  users.push(newUser);

  fs.writeFile(`./../dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        users: users,
      },
    });
  });
};

exports.getUser = (req, res) => {
  console.log(req.params);
  if (req.params.id * 1 < users.length) {
    const user = users.find(el => el.id === req.params.id * 1);
    res.status(200).json({
      data: {
        user,
      },
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.updateUser = (req, res) => {
  if (req.params.id * 1 < users.length) {
    res.status(200).json({
      status: 'success',
      message: 'Updated!!!',
    });
  } else {
    res.status(404).send('Not Found');
  }
};

exports.deleteUser = (req, res) => {
  res.status(204).json({
    message: 'Deleted',
    data: null,
  });
};