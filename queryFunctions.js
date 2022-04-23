const db = require('./db/connection');
// var { startApp } = require('./index')


function allDepts() {
    db.query('SELECT * FROM department', (err, results) => {
        console.log(results);
        // startApp();
    });
}

function allRoles() {
    db.query('SELECT * FROM emp_role', (err, results) =>{
        console.log(results)
    });
}

module.exports = {
    allDepts, allRoles
}