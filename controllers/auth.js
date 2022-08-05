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
      console.log(
        "Error in LDAP connection : " + err + "for user : " + username
      );
    } else {
      console.log(`Success LDAP connection for user ${username}`);
      res.render("index", {
        invalid: "password is incorrect",
        password: password,
        username: username,
      });
    }
  });
}
exports.login = async (req, res) => {
  try {
    /* Déstructuration de l'objet `req.body`. et recuperer username et password */
    const { username, password } = req.body;

    /* Vérifier si le nom d'utilisateur et le mot de passe ne sont pas vides. */
    if (!(username && password)) {
      res.status(400).render("index", {
        invalid: "tous les champs doit etre rempli",
        password,
        username,
      });
    }

    /* Recherche d'un utilisateur avec le nom d'utilisateur dans la base de données. */
    const user = await userModel.findOne({ username });

    // am using 0000 cause cnx is LDAP we dont need pass
    if (user && password === "0000") {
      /* Création d'un jwt jeton pour l'utilisateur. */
      const token = jwt.sign(
        {
          user_id: user.id,
        },
        config.TOKEN_KEY,
        {
          expiresIn: config.TOKEN_EXPIRATION_IN_HOURS,
        }
      );

      /* Définition du jeton sur l'objet utilisateur. */
      user.token = token;
      res.status(200).render("accueil");
    }
  } catch (error) {
    console.log(error);
  }
};
