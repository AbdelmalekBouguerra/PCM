/* Importation des modules ldapjs et mysql. */
const ldap = require("ldapjs");

const Sequelize = require("sequelize");
const db = require("../config/sequelize");
const userModel = require("../models/user")(db, Sequelize);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;
/**
 * Il prend un nom d'utilisateur et un mot de passe, puis tente de se connecter au serveur LDAP avec
 * ces informations d'identification. Si la liaison réussit, l'utilisateur est authentifié
 * @param username - Le nom d'utilisateur de l'utilisateur que vous souhaitez authentifier.
 * @param password - le mot de passe pour s'authentifier
 * @param res - l'objet de réponse
 */
function authLDAP(username, password, res) {
  const client = ldap.createClient({
    url: "ldap://10.111.106.11:389",
  });

  client.bind("SONATRACH\\" + username, password, (err) => {
    if (err) {
      res.status(400).render("index", {
        invalid: "Mot de passe ou sona invalide",
        password,
        username,
      });
    } else {
      return true;
    }
  });
}

exports.disconnect = (req, res) => {
  req.session.token = "";
  req.session.user_PCM = "";
  res.render("index");
};
exports.login = async (req, res) => {
  try {
    /* Déstructuration de l'objet `req.body`. et recuperer username et password */
    const { username, password } = req.body;
    console.log(
      "🚀 ~ file: auth.js ~ line 44 ~ exports.login= ~ username, password",
      username,
      password
    );

    /* Vérifier si le nom d'utilisateur et le mot de passe ne sont pas vides. */
    if (!(username && password)) {
      /* Affichage de la page d'index avec le message d'erreur. */
      res.status(400).render("index", {
        invalid: "Tous les champs doivent être remplis",
        password,
        username,
      });
    }

    /* Recherche d'un utilisateur avec le nom d'utilisateur dans la base de données. */
    // const user = await userModel.findOne({ where: { son: username } });
    // we need to let new users to access or app only chacking by ldap auth

    // am using 0000 cause cnx is LDAP we dont need pass

    /* Vérifier si l'utilisateur existe dans la base de données et si l'utilisateur est authentifié
    dans le serveur LDAP. */
    // if (user && authLDAP(username,password,res)) {
    if (password === "0000") {
      /* Création d'un jwt jeton pour l'utilisateur. */
      const token = jwt.sign(
        {
          user_ip: req.ip,
        },
        config.TOKEN_KEY,
        {
          expiresIn: config.TOKEN_EXPIRATION_IN_HOURS,
        }
      );

      /* Définition du jeton sur l'objet utilisateur. */
      // // user.token = token;
      // // user.username = username;
      req.session.token = token;
      req.session.PCM_USERNAME = username;
      // // req.session.user_PCM = user;
      /* Rendu de la page d'accueil. */
      res.status(200).render("accueil");
    } else {
      /* Affichage de la page d'index avec le message d'erreur. */
      res.status(400).render("index", {
        invalid: "Mot de passe ou sona invalide",
        password,
        username,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("500");
  }
};
