const db = require('../db/connection');
require('console.table');


//query functions
function allDepts() {
    db.query('SELECT id, dept_name AS department FROM department;', function (err, results) {
        console.table(results);
        startApp();
    });
}

const addDepts = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "name",
            message: "What is the name of the department?"
        }
    ])
        .then((dept_name) => {
            db.query(`INSERT INTO department(dept_name) VALUES (?)`, dept_name.name, function (err, results) {
                // console.table(results)
                console.log(err)
            });
            allDepts();
        });
};

function sortByDept() {
    db.query(`SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN emp_role R ON E.emp_role_id = R.id JOIN department D ON R.dept_id = D.id LEFT JOIN employee M on E.manager_id = M.id ORDER BY dept_name`, (err, results) => {
        console.table(results);
        startApp();
    });
};

module.exports = {
    allDepts, addDepts, sortByDept
}