const db = require('../db/connection');
require('console.table');

function allRoles() {
    db.query('SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary FROM emp_role JOIN department ON emp_role.dept_id=department.id', (err, results) => {
        console.table(results)
        startApp();
    });
}

const addRole = () => {
    db.promise().query('SELECT department.id, department.dept_name FROM department')
        .then(([departments]) => {
           let departmentChoices = departments.map(({
                id,
                dept_name
            }) => ({
                name: dept_name,
                value: id
            }));

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
                    db.query(
                        'INSERT INTO emp_role SET ?',
                        {
                            title: title,
                            dept_id: department,
                            salary: salary
                        },
                        function (err, results) {
                            console.log(err)
                        }
                    )
                })
                .then(() => allRoles())
        })
}

const removeRole = () => {
    db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
        .then(([removedRole]) => {
            let remove = removedRole.map(({
                id,
                title
            }) => ({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: "emp_role",
                    message: "Which role do you want to remove?",
                    choices: remove
                },
            ])
            .then((roleTitle) => {
                db.query('DELETE FROM emp_role WHERE id= ?', [roleTitle.emp_role], function (err, results) {
                    console.log(err)
                    
                })
            })
            .then(() => allRoles())
})
};

module.exports = {
    allRoles, addRole, removeRole
}
