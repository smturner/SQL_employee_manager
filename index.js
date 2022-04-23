const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection')
// const { allDepts, allRoles } = require('./queryFunctions')


function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View All Departments", "Add Department", "View All Roles", "Add Role", "View All Employees", "Add an Employee", "Update Employee Role", "exit"]
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.menu) {
                case "View All Departments":
                    allDepts();
                    break;
                case "Add Department":
                    break;
                case "View All Roles":
                    allRoles();
                    break;
                case "Add Role":
                    break;
                case "View All Employees":
                    allEmployees();
                    break;
                case "Add an Employee":
                    break;
                case "Update Employee Role":
                    break;
                case "Quit":
                    break;
                default:
                    process.exit();      
            }
        })
}


startApp();
// module.exports = { startApp }

function allDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        startApp();
    });
}

function allRoles() {
    db.query('SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary FROM emp_role JOIN department ON emp_role.dept_id=department.id', (err, results) => {
        console.log(results)
        startApp();
    });
}

function allEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        console.log(results)
        startApp();
    });
}


