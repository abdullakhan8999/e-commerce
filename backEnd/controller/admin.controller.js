const db = require("./../model/index");

exports.get_All_admin = async (req, res, next) => {
  await db.admin
    .findAll()
    .then((admin) => {
      res
        .status(200)
        .send(`Admin details :\n${JSON.stringify(admin, null, 2)}`);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Internal error while fetching all the admins",
      });
    });
};
exports.get_Admin = async (req, res, next) => {
  await db.admin
    .findByPk(req.params.id)
    .then((admin) => {
      res.status(200).write(JSON.stringify(admin, null, 2));
      res.end();
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some Internal error ${err.message} while fetching the admin based on the id:${req.params.id}`,
      });
    });
};
exports.post_Admin = async (req, res, next) => {
  const admin = req.body;
  await db.admin
    .create(admin)
    .then((admin) => {
      console.log(`Admin name: [ ${admin.admin_name}] got inserted in DB`);
      res.status(201).send(
        `Admin name: ${admin.admin_name} got inserted in DB 
          ${JSON.stringify(admin, null, 2)}`
      );
      res.end();
    })
    .catch((err) => {
      console.log(
        `Issue in inserting Admin name: [ ${admin.admin_name}]. Error message : ${err.message}`
      );
      res.status(500).send({
        message: "Some Internal error while storing the admin!",
      });
      res.end();
    });
};
exports.put_Admin = async (req, res, next) => {
  const admin = {
    admin_name: req.body.admin_name,
    email: req.body.email,
    password: req.body.password,
    userId: req.body.userId,
  };

  await db.admin
    .update(admin, {
      returning: true,
      where: { id: req.params.id },
    })
    .then((updatedAdmin) => {
      db.admin
        .findByPk(req.params.id)
        .then((admin) => {
          res.status(200).send(`${JSON.stringify(admin, null, 2)}`);
        })
        .catch((err) => {
          res.status(500).send({
            message: `Some Internal error while fetching the admin based on the id:${req.params.id}`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some Internal error while fetching the admin based on the id:${req.params.id}`,
      });
    });
};
exports.delete_Admin = async (req, res, next) => {
  await db.admin
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.status(200).send({
        message: "Successfully deleted the admin",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Some Internal error while deleting the admin based on the id:${req.params.id}`,
      });
    });
};
