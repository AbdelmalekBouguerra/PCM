const db = require('../env/db')
const style = require('../env/chalk');
// function 
var table = [];
function getDemandeTable(userId,callback){
    db.execute(
        'SELECT * FROM DPC WHERE ID_DEMANDEUR = ?;',
        [userId],
        (err,results) => {
            if (err) {
                console.log(err);
            }else{
                callback(results);
            }
        }
    )
}
exports.espaceDemandeur = (req,res) => {
    // if (req.session.isAuth && req.session.user) {
    //     getDemandeTable(req.session.user[0].ID,(results)=>{
    //         table = results;
    //         res.render('ED',{table : table});  
    //     })
    // } else 
        res.render('ED');    
}