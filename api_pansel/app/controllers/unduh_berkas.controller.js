const db = require("../models");
const UnduhBerkas = db.unduh_berkas;
const path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
  const nama_berkas = req.body ? (req.body.nama_berkas || req.body.title) : null;

  if (!req.body || !nama_berkas) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data = {
    order_no: req.body.order_no ? parseInt(req.body.order_no) : null,
    nama_berkas: nama_berkas,
    nama_file: (req.files && req.files.length > 0) ? req.files[0].filename : (req.body.nama_file || null),
    tanggal_publikasi: req.body.tanggal_publikasi || req.body.date || new Date(),
    url_link: req.body.url_link || "",
    is_active: req.body.is_active === 'false' ? false : true
  };

  UnduhBerkas.create(data)
    .then(result => {
      res.send({
        status: "success",
        message: "Berkas created successfully!",
        data: result
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating."
      });
    });
};

exports.findAll = (req, res) => {
  UnduhBerkas.findAll({ order: [['order_no', 'ASC'], ['createdAt', 'DESC']] })
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
  UnduhBerkas.findAll({ where: { is_active: true }, order: [['order_no', 'ASC'], ['createdAt', 'DESC']] })
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

  UnduhBerkas.findOne({ where: { uuid: uuid } })
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
    if (req.body.nama_berkas !== undefined) data.nama_berkas = req.body.nama_berkas;
    if (req.body.title !== undefined) data.nama_berkas = req.body.title;
    if (req.body.order_no !== undefined) data.order_no = req.body.order_no ? parseInt(req.body.order_no) : null;
    if (req.body.tanggal_publikasi !== undefined) data.tanggal_publikasi = req.body.tanggal_publikasi;
    if (req.body.date !== undefined) data.tanggal_publikasi = req.body.date;
    if (req.body.url_link !== undefined) data.url_link = req.body.url_link;
    if (req.body.is_active !== undefined) data.is_active = req.body.is_active === 'false' ? false : true;
  }

  if (req.files && req.files.length > 0) {
    data.nama_file = req.files[0].filename;
  } else if (req.body && req.body.nama_file !== undefined) {
    data.nama_file = req.body.nama_file;
  }

  UnduhBerkas.findOne({ where: { uuid: uuid } })
    .then(oldData => {
      if (!oldData) {
        return res.status(404).send({ message: `Cannot find with uuid=${uuid}.` });
      }

      const oldFile = oldData.nama_file;

      UnduhBerkas.update(data, { where: { uuid: uuid } })
        .then(num => {
          if (num == 1) {
            // Delete old file if new file was uploaded
            if (req.files && req.files.length > 0 && oldFile) {
              const oldFilePath = path.join(__dirname, "../../uploads/unduh_berkas/", oldFile);
              if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
              }
            }
            res.send({
              status: "success",
              message: "Updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update with uuid=${uuid}. Maybe it was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({ message: "Error updating with uuid=" + uuid });
        });
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving old data before update." });
    });
};

exports.delete = (req, res) => {
  const uuid = req.params.uuid;

  UnduhBerkas.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Cannot find with uuid=${uuid}.` });
      }

      const nama_file = data.nama_file;

      UnduhBerkas.destroy({ where: { uuid: uuid } })
        .then(num => {
          if (num == 1) {
            // Delete associated file
            if (nama_file) {
              const filePath = path.join(__dirname, "../../uploads/unduh_berkas/", nama_file);
              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            }
            res.send({
              status: "success",
              message: "Deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete with uuid=${uuid}. Maybe it was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({ message: "Could not delete with uuid=" + uuid });
        });
    })
    .catch(err => {
      res.status(500).send({ message: "Error looking up record for deletion." });
    });
};

exports.download = (req, res) => {
  const uuid = req.params.uuid;

  UnduhBerkas.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data && data.nama_file) {
        const filePath = path.join(__dirname, "../../uploads/unduh_berkas/", data.nama_file);
        if (fs.existsSync(filePath)) {
          res.download(filePath, data.nama_berkas + path.extname(data.nama_file));
        } else {
          res.status(404).send({
            message: "Physical file does not exist on server."
          });
        }
      } else {
        res.status(404).send({
          message: "No file associated with this record or not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error processing download."
      });
    });
};

exports.view = (req, res) => {
  const uuid = req.params.uuid;

  UnduhBerkas.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data && data.nama_file) {
        const filePath = path.join(__dirname, "../../uploads/unduh_berkas/", data.nama_file);
        if (fs.existsSync(filePath)) {
          res.contentType("application/pdf");
          res.sendFile(filePath);
        } else {
          res.status(404).send({
            message: "Physical file does not exist on server."
          });
        }
      } else {
        res.status(404).send({
          message: "No file associated with this record or not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error processing file view."
      });
    });
};
