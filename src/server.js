const express = require("express");
const app = express();
const path = require("path");

// setting cors to consume from this api
const cors = require("cors");
app.use(cors());

// token
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

// middleware
const auth = require("./middleware/auth");

// Settings to use forms - begin
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// Settings to use forms - end

// Setting View Engine - begin
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Setting View Engine - end

const connection = require("./database/database");
const Course = require("./database/Course");
const Lesson = require("./database/Lesson");

// Conecction test - begin
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });
// Conecction test - end

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// list all courses - begin
app.get("/courses", async (req, res) => {
  await Course.findAll({
    raw: true,
  }).then((result) => {
    if (result != undefined) {
      res.statusCode = 200;
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
});
// list all courses - end

// list a specific courses - begin
app.get("/course/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    await Course.findOne({
      raw: true,
      where: {
        id: id,
      },
    }).then((result) => {
      if (result != undefined) {
        res.statusCode = 200;
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// list a specific course - end

// list all lessons from a specific course - begin
app.get("/lessons/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    await Lesson.findAll({
      raw: true,
      where: {
        courseId: id,
      },
    }).then((result) => {
      if (result != undefined) {
        res.statusCode = 200;
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// list all lessons from a specific course - end

// create a course - begin
app.post("/course", auth, (req, res) => {
  var { title, cover, teacher, description } = req.body;

  if (
    title != undefined &&
    cover != undefined &&
    teacher != undefined &&
    description != undefined
  ) {
    Course.create({
      title: title,
      cover: cover,
      teacher: teacher,
      description: description,
    }).then(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});
// create a course - end

// delete a course and its lessons - begin
app.delete("/course/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    await Course.findOne({
      raw: true,
      where: {
        id: id,
      },
    }).then(async (result) => {
      if (result != undefined) {
        await Lesson.destroy({
          where: {
            CourseId: id,
          },
        }).then(async () => {
          await Course.destroy({
            where: {
              id: id,
            },
          }).then(() => {
            res.sendStatus(200);
          });
        });
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// delete a course and its lessons - begin

// update a course - begin
app.put("/course/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    await Course.findOne({
      raw: true,
      where: {
        id: id,
      },
    }).then(async (result) => {
      if (result != undefined) {
        var { title, cover, teacher, description } = req.body;

        if (
          title != undefined &&
          cover != undefined &&
          teacher != undefined &&
          description != undefined
        ) {
          // title year price
          await Course.update(
            {
              title: title,
              cover: cover,
              teacher: teacher,
              description: description,
            },
            {
              where: {
                id: id,
              },
            }
          ).then(() => {
            res.sendStatus(200);
          });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// update a course - begin

// create a lesson - begin
app.post("/lesson", auth, (req, res) => {
  var { title, link, description, courseid } = req.body;

  if (
    title != undefined &&
    link != undefined &&
    description != undefined &&
    courseid != undefined
  ) {
    Lesson.create({
      title: title,
      link: link,
      description: description,
      CourseId: courseid,
    }).then(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});
// create a lesson - end

// delete a lesson - begin
app.delete("/lesson/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    await Lesson.findOne({
      raw: true,
      where: {
        id: id,
      },
    }).then(async (result) => {
      if (result != undefined) {
        await Lesson.destroy({
          where: {
            id: id,
          },
        }).then(() => {
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// delete a lesson - begin

// update a lesson - begin
app.put("/lesson/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    await Lesson.findOne({
      raw: true,
      where: {
        id: id,
      },
    }).then(async (result) => {
      if (result != undefined) {
        var { title, link, description, CourseId } = req.body;

        if (
          title != undefined &&
          link != undefined &&
          description != undefined &&
          CourseId != undefined
        ) {
          // title year price
          await games
            .update(
              {
                title: title,
                link: link,
                description: description,
              },
              {
                where: {
                  id: id,
                },
              }
            )
            .then(() => {
              res.sendStatus(200);
            });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    });
  }
});
// update a lesson - begin
/*
// route to authentication - begin
app.post("/auth", (req, res) => {
    var {
        email,
        password
    } = req.body
    if (email != undefined) {
        users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user != undefined) {
                if (user.password == password) {
                    jwt.sign({
                        id: user.id,
                        username: user.username
                    }, jwtSecret, {
                        expiresIn: "48h"
                    }, (err, token) => {
                        if (err) {
                            res.status(400)
                            res.json({
                                err: "Falha interna"
                            })
                        } else {
                            res.status(200)
                            res.json({
                                token: token
                            })
                        }
                    })
                } else {
                    res.status(400)
                    res.json({
                        err: "Combinação de email e senha inválida"
                    })
                }
            } else {
                res.status(404)
                res.json({
                    err: "Usuário não encontrado"
                })
            }
        })
    } else {
        res.status(400)
        res.json({
            err: "E-mail inválido"
        })
    }
})
// route to authentication - end

// route to signup - begin
app.post("/signup", (req, res) => {
    var {
        email,
        password,
        username
    } = req.body
    if ((email != undefined) && (username != undefined) && (password != undefined)) {
        users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user == undefined) {
                users.create({
                    email: email,
                    password: password,
                    username: username
                }).then(() => {
                    res.sendStatus(200)
                })
            } else {
                res.status(400)
                res.json({
                    err: "Usuário já cadastrado"
                })
            }
        })

    } else {
        res.status(400)
        res.json({
            err: "Credenciais inválidas"
        })
    }
})
// route to signup - end
*/
app.listen(process.env.PORT || 45789, () => {
  console.log("API RODANDO");
});
