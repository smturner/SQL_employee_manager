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
            // console.log(ans);
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
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmpRole();
                    break;
                case "Quit":
                    break;
                default:
                    process.exit();
            }
        })
}

startApp();


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
            console.log(dept_name)
            db.query(`INSERT INTO department(dept_name) VALUES (?)`, dept_name.name, function (err, results) {
                console.table(results)
            });
            allDepts();
        });
};

function allRoles() {
    db.query('SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary FROM emp_role JOIN department ON emp_role.dept_id=department.id', (err, results) => {
        console.table(results)
        startApp();
    });
}

const addRole = () => {
    db.promise().query('SELECT department.id, department.dept_name FROM department')
        .then(([departments]) => {
            // console.log(departments)
            let departmentChoices = departments.map(({
                id,
                dept_name
            }) => ({
                name: dept_name,
                value: id
            }));
            console.log(departmentChoices)

            inquirer.prompt([
                {
                    type: 'input',
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    type: 'input',
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: 'list',
                    name: "department",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(({ title, department, salary }) => {
                    console.log(title, department, salary)
                    db.query(
                        'INSERT INTO emp_role SET ?',
                        {
                            title: title,
                            dept_id: department,
                            salary: salary
                        },
                        function (err, results) {
                            console.table(results)
                        }
                    )
                })
                .then(() => allRoles())
        })
}

function allEmployees() {
    db.query('SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name AS department, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN emp_role R ON E.emp_role_id = R.id JOIN department D ON R.dept_id = D.id LEFT JOIN employee M on E.manager_id = M.id', (err, results) => {
        console.table(results)
        startApp();
    });
}

const addEmployee = () => {
    db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
        .then(([roles]) => {
            let roleChoices = roles.map(({
                id,
                title
            }) => ({
                name: title,
                value: id
            }));
            console.log(roleChoices)

            db.promise().query('SELECT CONCAT (employee.first_name, " ", employee.last_name) AS name, employee.id FROM employee')
                .then(([managers]) => {
                    console.log(managers)
                    let managerChoices = managers.map(({
                        id,
                        name
                    }) => ({
                        name: name,
                        value: id
                    }));
                    console.log(managerChoices)

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: "firstName",
                            message: "What is the employee's first name?"
                        },
                        {
                            type: 'input',
                            name: "lastName",
                            message: "What is the employee's last name?"
                        },
                        {
                            type: 'list',
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        },
                        {
                            type: 'list',
                            name: "manager",
                            message: "Who is the employee's manager?",
                            choices: managerChoices
                        }
                    ])
                        .then(({ firstName, lastName, role, manager }) => {
                            console.log(firstName, lastName, role, manager)
                            db.query(
                                'INSERT INTO employee SET ?',
                                {
                                    first_name: firstName,
                                    last_name: lastName,
                                    emp_role_id: role,
                                    manager_id: manager
                                },
                                function (err, results) {
                                    console.table(results)
                                }
                            )
                        })
                        .then(() => allEmployees())
                });
        });
};

const updateEmpRole = () => {
    db.promise().query('Select CONCAT(employee.first_name, " ", employee.Last_name) AS name FROM employee')
        .then(([employees]) => {
            let employeeChoice = employees.map(({
                name
            }) => ({
                name: name
            }))
            console.log(employeeChoice)
    db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
                .then(([roles]) => {
                    let roleChoices = roles.map(({
                        id,
                        title
                    }) => ({
                        name: title,
                        value: id
                    }));
                    console.log(roleChoices)

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: "employee",
                            message: "Which employee's role do you want to update?",
                            choices: employeeChoice
                        },
                        {
                            type: 'list',
                            name: "role",
                            message: "Which role do you want to assign the selected employee?",
                            choices: roleChoices
                }
            ])
            .then(({ employee, role }) => {
                db.query('UPDATE employee SET emp_role_id = ? WHERE id = ?',
                 {
                    
                     emp_role_id: role
                },
                function(err, results) {
                    console.table(results)
                }
                )
            })
            .then(() => startApp())
        })
    })



        }





