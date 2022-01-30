const ldap = require('ldapjs');
const db = require('../env/db');
const style = require('../env/chalk');

// retrive the username
function  getUser(username,callback) {
     db.execute(
        'SELECT * FROM DEMANDEUR WHERE USERNAME = ?',
        [username],
         (err, results) => {
            if (err) {
                console.log(style.error('MySQL in getUser :'+err));
                return;
            }
            callback(results);
        }
    );
}

// connect to LDAP server
function authLDAP(username, password, res) {
    const client = ldap.createClient({
        url: 'ldap://10.111.106.11:389',
    });

    client.bind("SONATRACH\\" + username, password, (err) => {
        if (err) {
            console.log(style.error('Error in LDAP connection : ' + err + 'for user : ' + username));
        } else {
            console.log(style.success('Success LDAP connection for user ' + username));
            res.render('index', {
                invalid: 'password is incorrect',
                password: password,
                username: username,
            });
        }
    })
}
// get the post request sent by the index form
exports.login = (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (password !== '0000') {
        res.render('index', {
            invalid: 'password is incorrect',
            password: password,
            username: username,
        })
    } else {
        req.session.isAuth = true; // bool value to check if user logged in
        getUser(username,(user)=>{
            req.session.user = user; // save user information in session value
        })
        req.session.username = username;
        res.render('accueil')
    }
    // authLDAP(username,password,res);
};