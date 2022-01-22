const res = require('express/lib/response');
const ldap = require('ldapjs');
const db = require('../env/db')

// retrive the username
function getUser(username) {
    db.execute(
        'SELECT * FROM DEMANDEUR WHERE USERNAME = ?',
        [username],
        function(err, results, fields) {
            if (err) {
                console.log(`err connection in getUser ${err}`);
                return false;
            }
            console.log(fields);
            return results;
        }
      );
}

// connect to LDAP server
function authLDAP(username, password,res) {
    const client = ldap.createClient({
        url: 'ldap://10.111.106.11:389',
    });

    client.bind("SONATRACH\\" + username, password, (err) => {
        if (err) {
            console.log('Error in LDAP connection : ' + err + 'for user : ' + username);
        } else {
            console.log('Success LDAP connection for user ' + username);
            res.render('index',{
                invalid: 'password is incorrect',
                password: password,
                username: username,
            });
        }
    })
}
// get the post request sent by the index form
exports.ldap = (req, res) => {
        const {
            username,
            password
        } = req.body;
            if (password !== '0000'){
            res.render('index',{
                invalid: 'password is incorrect',
                password: password,
                username: username,
            })
        } else{
            res.
            res.render('accueil')
        }
       // authLDAP(username,password,res);
    };
