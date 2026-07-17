const db = require("../models");
const Jadwal = db.jadwal;

exports.create = (req, res) => {
  const kegiatan = req.body ? (req.body.kegiatan || req.body.judul) : null;

  if (!req.body || !kegiatan) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const statusVal = req.body.status !== undefined && req.body.status !== null ? req.body.status : (req.body.label !== undefined && req.body.label !== null ? req.body.label : true);
  const data = {
    kegiatan: kegiatan,
    status: typeof statusVal === 'boolean' ? statusVal : (statusVal === 'true' || statusVal === true || statusVal === 1),
    tanggal_mulai: req.body.tanggal_mulai || null,
    tanggal_selesai: req.body.tanggal_selesai || null,
    order_no: req.body.order_no ? parseInt(req.body.order_no) : null
  };

  Jadwal.create(data)
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
  Jadwal.findAll({ order: [['order_no', 'ASC'], ['createdAt', 'DESC']] })
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

  Jadwal.findOne({ where: { uuid: uuid } })
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

  const data = {};
  if (req.body) {
    if (req.body.kegiatan !== undefined) data.kegiatan = req.body.kegiatan;
    if (req.body.judul !== undefined) data.kegiatan = req.body.judul;
    if (req.body.status !== undefined) {
      data.status = typeof req.body.status === 'boolean' ? req.body.status : (req.body.status === 'true' || req.body.status === true || req.body.status === 1);
    }
    if (req.body.label !== undefined) {
      data.status = typeof req.body.label === 'boolean' ? req.body.label : (req.body.label === 'true' || req.body.label === true || req.body.label === 1);
    }
    if (req.body.tanggal_mulai !== undefined) data.tanggal_mulai = req.body.tanggal_mulai;
    if (req.body.tanggal_selesai !== undefined) data.tanggal_selesai = req.body.tanggal_selesai;
    if (req.body.order_no !== undefined) data.order_no = req.body.order_no ? parseInt(req.body.order_no) : null;
  }

  Jadwal.update(data, {
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

  Jadwal.destroy({
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
