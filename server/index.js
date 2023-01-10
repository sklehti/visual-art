require("dotenv").config();

const express = require("express");

const path = require("path");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 8080;

const connection = require("./config/db");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
var fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/api/allInfo", (req, res) => {
  const sql = "SELECT * FROM painting ORDER BY name";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

app.get("/api/allInfoByYear", (req, res) => {
  const sql = "SELECT * FROM painting ORDER BY year";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    res.send(results);
  });
});

app.get("/api/getAdmin/:username/:password", (req, res) => {
  try {
    const sql = "SELECT username, password, admin FROM admin WHERE username=?";
    connection.query(sql, req.params.username, (err, results) => {
      if (err) throw err;

      if (results.length < 1) {
        res.json({ success: 0 });
        return console.log("käyttäjätunnus on väärä!");
      }
      if (results[0].admin === 0) {
        res.json({ success: 0 });
        return console.log("Käyttäjällä ei ole admin oikeuksia!");
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
        res.json({ success: 0 });
        return console.log("salasana on väärä!");
      }
    });
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
});

app.get("/api/validateToken/:token", (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);

    if (decodedToken) {
      res.json({ success: 1 });
    } else {
      return res.status(401).send(error);
    }
  } catch (e) {
    res.json({ success: 0 });
  }
});

app.post("/api/createAdmin", async (req, res) => {
  const user = req.body.newAdmin.username;
  const sql = "SELECT * FROM admin WHERE username=?";
  connection.query(sql, user, (err, results) => {
    if (results.length === 0) {
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
    } else {
      res.json("käyttäjä on jo olemassa");
    }
  });
});

app.post("/api/imageupload", async (req, res) => {
  try {
    const imageResize = {
      image: req.body.image,
      name: req.body.name,
      text: req.body.text,
      year: req.body.year,
      height: req.body.height,
      width: req.body.width,
    };

    const sql = "INSERT INTO painting SET ?";
    connection.query(sql, imageResize, (err, results) => {
      if (err) throw err;
      res.json({ success: 1 });
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/updateImageInfo", (req, res) => {
  const info = [
    req.body.name,
    req.body.year,
    req.body.height,
    req.body.width,
    req.body.text,
    req.body.image,
  ];

  try {
    const sql =
      "UPDATE painting SET name=?, year=?, height=?, width=?, text=? WHERE image=?";
    connection.query(sql, info, (err, results) => {
      res.send(results);
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/deleteImage/:image", (req, res) => {
  const img = req.params.image;

  try {
    const sql = `DELETE FROM painting WHERE image LIKE '%${img}'`;
    connection.query(sql, (err, results) => {
      res.send("Tiedoston tiedot on poistettu tietokannasta.");
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () =>
  console.log(`Visual Art app listening at http://localhost:${port}`)
);
