const db = require("../models");
const Pengumuman = db.pengumuman;

exports.create = (req, res) => {
  if (!req.body.judul) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data = req.body;
  

  Pengumuman.create(data)
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
  Pengumuman.findAll()
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
  Pengumuman.findAll({ where: { is_active: true } })
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

  Pengumuman.findOne({ where: { uuid: uuid } })
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
  

  Pengumuman.update(data, {
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

  Pengumuman.destroy({
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
