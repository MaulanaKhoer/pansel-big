const db = require("../models");
const Formasi = db.formasi;

exports.create = (req, res) => {
  if (!req.body.jabatan) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const formasi = {
    order_no: req.body.order_no,
    jabatan: req.body.jabatan,
    tugas_fungsi: req.body.tugas_fungsi,
    is_active: req.body.is_active ? req.body.is_active : true
  };

  Formasi.create(formasi)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Formasi."
      });
    });
};

exports.findAll = (req, res) => {
  Formasi.findAll({ order: [['order_no', 'ASC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving formasi."
      });
    });
};

exports.findAllActive = (req, res) => {
  Formasi.findAll({ where: { is_active: true }, order: [['order_no', 'ASC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving active formasi."
      });
    });
};

exports.findOne = (req, res) => {
  const uuid = req.params.uuid;

  Formasi.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Formasi with uuid=${uuid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Formasi with uuid=" + uuid
      });
    });
};

exports.update = (req, res) => {
  const uuid = req.params.uuid;

  Formasi.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Formasi was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Formasi with uuid=${uuid}. Maybe Formasi was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Formasi with uuid=" + uuid
      });
    });
};

exports.delete = (req, res) => {
  const uuid = req.params.uuid;

  Formasi.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Formasi was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Formasi with uuid=${uuid}. Maybe Formasi was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Formasi with uuid=" + uuid
      });
    });
};
