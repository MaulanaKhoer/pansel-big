const db = require("../models");
const Tahapan = db.tahapan;

exports.create = (req, res) => {
  if (!req.body || !req.body.judul) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data = req.body;
  

  Tahapan.create(data)
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
  Tahapan.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.findAllActive = (req, res) => {
  Tahapan.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving active data."
      });
    });
};

exports.findOne = (req, res) => {
  const uuid = req.params.uuid;

  Tahapan.findOne({ where: { uuid: uuid } })
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
  

  Tahapan.update(data, {
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

  Tahapan.destroy({
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
