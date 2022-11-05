const express = require("express");
const path = require("path");
const db = require("./config/sequelize");
const hbs = require("hbs");
const session = require("cookie-session");
const compression = require("compression");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

app.use(compression());
app.use(fileUpload());

const http_port = process.env.PORT || 3031;

/* Un middleware qui permet de faire des requêtes cross-origin. */
app.use(cors());
// Parse URL encoded bodies sent by forms
app.use(express.urlencoded({ extended: false }));
/* Analyser le corps de la requête et le rendre disponible dans la propriété req.body. */
app.use(express.json());

/* Mise en place d'une session cookie. */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

/* Routage des requêtes vers les fichiers appropriés. */
const indexRouter = require("./routes/index");
const prestationRouter = require("./routes/prestation");

app.use("/", indexRouter);
app.use("/prestation", prestationRouter);

/* Connexion à la base de données MySQL. */
db.authenticate()
  .then(() => console.log("Database connection established ..."))
  .catch((err) => console.log("Error connecting to Database : " + err));

// db.connect((err) => {
//   if (err) {
//     console.log("error db connction" + err);
//   } else {
//     console.log("MySQL connected");
//   }
// });

/* Dire à express d'utiliser le répertoire public comme répertoire statique. public directory */
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

/* Dire à express d'utiliser hbs comme moteur de vue. view engine */
app.set("view engine", "hbs");

/* Dire à hbs de rechercher des partiels dans le répertoire views/templates. */
hbs.registerPartials(path.join(__dirname, "views", "templates"));

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error/500", {
      message: err.message,
      error: err,
    });
  });
}

const serveIndex = require("serve-index");
app.use(
  "/dpcFiles",
  express.static("public/uploads"),
  serveIndex(path.join(__dirname, "./public/uploads"), { icons: true })
);

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error/500", {
    message: err.message,
    error: {},
  });
});

app.listen(http_port, () => {
  console.log(`Server started : http://localhost:${http_port}`);
});

/* Exportation de l'objet d'application afin qu'il puisse être utilisé dans d'autres fichiers. */
module.exports = app;
