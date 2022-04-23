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
            choices: ["View All Departments", "Add Department", "View All Roles", "Add Role", "View All Employees", "Add an Employee", "Update Employee Role", "Quit"]
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
                    break;
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
    db.query('SELECT * FROM emp_role', (err, results) => {
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


