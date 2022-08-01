const express = require("express");
var http = require("http");
const path = require("path");
const db = require("./config/mysql");
const hbs = require("hbs");
const session = require("cookie-session");
const compression = require("compression");
const cors = require("cors");
const app = express();
app.use(compression());

// express http server
var httpServer = http.createServer(app);
const http_port = process.env.PORT || 3031;

httpServer.listen(http_port, () => {
  console.log(`Server started : http://localhost:${http_port}`);
});

/* Un middleware qui permet de faire des requêtes cross-origin. */
app.use(cors());
// Parse URL encoded bodies sent by forms
app.use(express.urlencoded({ extended: false }));
/* Analyser le corps de la requête et le rendre disponible dans la propriété req.body. */
app.use(express.json());

/* Mise en place d'une session cookie. */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ep]jhd%oe&f7p|(+6(w|id(4.>5b.f",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

/* Routage des requêtes vers les fichiers appropriés. */
const indexRouter = require("./routes/index");
const prestationRouter = require("./routes/prestation");

app.use("/", indexRouter);
app.use("/prestation", prestationRouter);

/* Connexion à la base de données MySQL. */
db.connect((err) => {
  if (err) {
    console.log("error db connction" + err);
  } else {
    console.log("MySQL connected");
  }
});

/* Dire à express d'utiliser le répertoire public comme répertoire statique. public directory */
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

/* Dire à express d'utiliser hbs comme moteur de vue. view engine */
app.set("view engine", "hbs");

/* Dire à hbs de rechercher des partiels dans le répertoire views/templates. */
hbs.registerPartials(path.join(__dirname, "views", "templates"));

/* Exportation de l'objet d'application afin qu'il puisse être utilisé dans d'autres fichiers. */
module.exports = app;
