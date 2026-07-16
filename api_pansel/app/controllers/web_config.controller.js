const db = require("../models");
const WebConfig = db.web_config;

exports.create = (req, res) => {
  if (!req.body.key_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data = req.body;
  

  WebConfig.create(data)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating."
      });
    });
};

exports.findAll = (req, res) => {
  WebConfig.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.findOne = (req, res) => {
  const uuid = req.params.uuid;

  WebConfig.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with uuid=${uuid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving with uuid=" + uuid
      });
    });
};

exports.update = (req, res) => {
  const uuid = req.params.uuid;
  const data = req.body;
  

  WebConfig.update(data, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update with uuid=${uuid}. Maybe it was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating with uuid=" + uuid
      });
    });
};

exports.delete = (req, res) => {
  const uuid = req.params.uuid;

  WebConfig.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete with uuid=${uuid}. Maybe it was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete with uuid=" + uuid
      });
    });
};
