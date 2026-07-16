const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.register = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.loginOperator = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        status: "success",
        Authorization: token,
        username: user.username,
        public_id: user.uuid
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.validOperator = (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Token is valid"
  });
};

exports.logout = (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Logged out successfully"
  });
};
