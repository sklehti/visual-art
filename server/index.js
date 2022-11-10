require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 8080;

const connection = require("./config/database");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public_html/", "uploads"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.get("/images/:id", (req, res) => {
  const pathname = path.join(
    __dirname,
    `../public_html/uploads/${req.params.id}`
  );

  res.sendFile(pathname);
});

app.get("/allInfo", (req, res) => {
  const sql = "SELECT * FROM painting";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

app.get("/getAdmin/:username/:password", (req, res) => {
  try {
    const sql = "SELECT username, password FROM admin WHERE username=?";
    connection.query(sql, req.params.username, (err, results) => {
      if (err) throw err;

      if (results.length < 1) {
        // TODO: korjaa tämä kohta!
        return console.log("käyttäjätunnus on väärä!");
      }
      if (bcrypt.compareSync(req.params.password, results[0].password)) {
        const userForToken = {
          username: req.params.username,
          id: req.params._id,
        };

        const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res
          .status(200)
          .send({ token, username: req.params.username, status: true });
      } else {
        // TODO: korjaa tämä kohta!
        return console.log("salasana on väärä!");
      }
    });
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
});

app.get("/validateToken/:token", (req, res) => {
  const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

  if (decodedToken) {
    res.json({ success: 1 });
  } else {
    return res.status(401).send(error);
  }
});

app.post("/createAdmin", async (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.newAdmin.password, salt);

  const adminUser = {
    username: req.body.newAdmin.username,
    password: hash,
    admin: req.body.newAdmin.admin,
  };

  try {
    const sql = "INSERT INTO admin SET ?";
    connection.query(sql, adminUser, (err, results) => {
      if (err) throw err;

      res.json({ success: 1 });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/imageupload", async (req, res) => {
  try {
    let upload = multer({
      storage: storage,
      // TODO: seuraava rivi lisätty myöhemmin!
      //lisää myös: hyväksyy vain kuvatiedostot
      limits: { fileSize: 1000000 },
    }).single("avatar");
    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const imageResize = {
        image: req.file.filename,
        name: req.body.name,
        text: req.body.text,
      };

      const sql = "INSERT INTO painting SET ?";
      connection.query(sql, imageResize, (err, results) => {
        if (err) throw err;
        res.json({ success: 1 });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () =>
  console.log(`Visual Art app listening at http://localhost:${port}`)
);
