const db = require("../models");
const Pengumuman = db.pengumuman;
const path = require("path");
const fs = require("fs");

exports.create = (req, res) => {
  const judul = req.body ? (req.body.judul || req.body.title) : null;

  if (!judul) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const data = {
    judul: judul,
    tanggal: req.body.tanggal || req.body.date || new Date(),
    konten: req.body.konten || req.body.notes || "",
    file_url: (req.files && req.files.length > 0) ? req.files[0].filename : (req.body.file_url || null),
    is_active: req.body.is_active === 'false' ? false : true
  };

  Pengumuman.create(data)
    .then(result => {
      res.send({
        status: "success",
        message: "Pengumuman created successfully!",
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
  Pengumuman.findAll({ order: [['tanggal', 'DESC'], ['createdAt', 'DESC']] })
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
  Pengumuman.findAll({ where: { is_active: true }, order: [['tanggal', 'DESC'], ['createdAt', 'DESC']] })
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

  const data = {};
  if (req.body) {
    if (req.body.judul !== undefined) data.judul = req.body.judul;
    if (req.body.title !== undefined) data.judul = req.body.title;
    if (req.body.tanggal !== undefined) data.tanggal = req.body.tanggal;
    if (req.body.date !== undefined) data.tanggal = req.body.date;
    if (req.body.konten !== undefined) data.konten = req.body.konten;
    if (req.body.notes !== undefined) data.konten = req.body.notes;
    if (req.body.is_active !== undefined) data.is_active = req.body.is_active === 'false' ? false : true;
  }
  
  if (req.files && req.files.length > 0) {
    data.file_url = req.files[0].filename;
  } else if (req.body && req.body.file_url !== undefined) {
    data.file_url = req.body.file_url;
  }

  // Find old one to potentially delete old file
  Pengumuman.findOne({ where: { uuid: uuid } })
    .then(oldData => {
      if (!oldData) {
        return res.status(404).send({ message: `Cannot find with uuid=${uuid}.` });
      }

      const oldFile = oldData.file_url;

      Pengumuman.update(data, { where: { uuid: uuid } })
        .then(num => {
          if (num == 1) {
            // Delete old file if new file was uploaded
            if (req.files && req.files.length > 0 && oldFile) {
              const oldFilePath = path.join(__dirname, "../../uploads/pengumuman/", oldFile);
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

  Pengumuman.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Cannot find with uuid=${uuid}.` });
      }

      const file_url = data.file_url;

      Pengumuman.destroy({ where: { uuid: uuid } })
        .then(num => {
          if (num == 1) {
            // Delete associated file
            if (file_url) {
              const filePath = path.join(__dirname, "../../uploads/pengumuman/", file_url);
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

  Pengumuman.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data && data.file_url) {
        const filePath = path.join(__dirname, "../../uploads/pengumuman/", data.file_url);
        if (fs.existsSync(filePath)) {
          res.download(filePath, data.judul + path.extname(data.file_url));
        } else {
          res.status(404).send({
            message: "Physical file does not exist on server."
          });
        }
      } else {
        res.status(404).send({
          message: "No file associated with this Pengumuman or record not found."
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

  Pengumuman.findOne({ where: { uuid: uuid } })
    .then(data => {
      if (data && data.file_url) {
        const filePath = path.join(__dirname, "../../uploads/pengumuman/", data.file_url);
        if (fs.existsSync(filePath)) {
          const ext = path.extname(data.file_url).toLowerCase();
          if (ext === '.pdf') {
            res.contentType("application/pdf");
            res.sendFile(filePath);
          } else {
            res.download(filePath, (data.judul || "pengumuman") + ext);
          }
        } else {
          res.status(404).send({
            message: "Physical file does not exist on server."
          });
        }
      } else {
        res.status(404).send({
          message: "No file associated with this Pengumuman or record not found."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error processing file view."
      });
    });
};
