const db = require("../models");
const WebConfig = db.web_config;

exports.create = (req, res) => {
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
  WebConfig.findOne()
    .then(config => {
      if (config) {
        const transformed = [
          { key_name: "title", value: config.title },
          { key_name: "caption", value: config.caption },
          { key_name: "pratama", value: String(config.pratama) },
          { key_name: "madya", value: String(config.madya) },
          { key_name: "utama", value: String(config.utama) }
        ];
        res.send(transformed);
      } else {
        res.send([]);
      }
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

// --- Custom routes for Seleksi settings ---

exports.getActive = (req, res) => {
  WebConfig.findOne()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        WebConfig.create({
          title: "Seleksi Jabatan Pimpinan Tinggi BIG",
          caption: "Formasi Tahun 2026",
          pratama: 0,
          madya: 0,
          utama: 0
        }).then(newData => {
          res.send(newData);
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Error creating default config."
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving active config."
      });
    });
};

exports.updateActive = (req, res) => {
  const { title, caption, pratama, madya, utama, public_id } = req.body;
  const whereClause = public_id ? { uuid: public_id } : {};

  WebConfig.findOne({ where: whereClause })
    .then(config => {
      if (config) {
        config.update({
          title,
          caption,
          pratama: parseInt(pratama) || 0,
          madya: parseInt(madya) || 0,
          utama: parseInt(utama) || 0
        }).then(() => {
          res.send({ status: "success", message: "Updated successfully." });
        }).catch(err => {
          res.status(500).send({ message: err.message || "Error updating config." });
        });
      } else {
        WebConfig.create({
          title,
          caption,
          pratama: parseInt(pratama) || 0,
          madya: parseInt(madya) || 0,
          utama: parseInt(utama) || 0
        }).then(() => {
          res.send({ status: "success", message: "Created successfully." });
        }).catch(err => {
          res.status(500).send({ message: err.message || "Error creating config." });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error finding config." });
    });
};


