const inquirer = require('inquirer');
const { query } = require('./db/connection');
require('console.table');
const db = require('./db/connection');
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
                    addDepts();
                    break;
                case "View All Roles":
                    allRoles();
                    break;
                case "Add Role":
                    addRole();
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
    db.query('SELECT * FROM department;', function (err, results) {
        console.log(results);
        startApp();
    });
}

const addDepts = () => {
    inquirer.prompt ([
        {
            type:'input',
            name: "name",
            message: "What is the name of the department?"
        }
    ])
    .then ((dept_name) => {
        console.log(dept_name)
        db.query(`INSERT INTO department(dept_name) VALUES ("?")`, dept_name,  function (err, results) {
            console.log(results)
        });
        allDepts();
        });
};

function allRoles() {
    db.query('SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary FROM emp_role JOIN department ON emp_role.dept_id=department.id', (err, results) => {
        console.log(results)
        startApp();
    });
}

const addRole= () => {
    inquirer.prompt ( [
        {
            type:'input',
            name: "role_name",
            message: "What is the name of the role?"
        },
        {
            type:'input',
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type:'list',
            name: "department",
            message: "Which department does the role belong to?",
            choices: ["Engineering", "Finance", "Legal", "Sales", "Services"]
        }
    ])
    .then ((title, salary, dept_id) => {
        console.log(title, salary, dept_id)
        db.query(`INSERT INTO emp_role(title, salary, dept_id)
        VALUES ?`, {title, salary, dept_id}, function(err, results) {
            console.log(results)
        })
       allRoles();
    }) 
}


function allEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.dept_id AS department, emp_role.salary, employee.manager_id FROM employee JOIN emp_role ON employee.emp_role_id=emp_role.id', (err, results) => {
        console.log(results)
        startApp();
    });
}




