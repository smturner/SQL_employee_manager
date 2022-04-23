# SQL_employee_manager

rename the database when you get her code



2. Create a db folder to hold all your database files, including the connection to your SQL database
    - Use your mysql shell username and password
    -Reference Activities that do the same thing -- these are in the server.js file usually
    - Import mysql2 into the connection file
    - Export your connection to the db

3. Build your schema.sql using the README instructions and charts
    - Create a database -- employees
    - Create a departments table
    - Create a roles table
    - Create an employee table

4. Create a seed.sql file that adds data to the tables

5. Create a main index.js file
    -Import inquirer, console.table, db connection 
    -Create a function to start the inquirer prompts and display the main menu
    -Use conditionals to run appropriate function based on the user's choice in the main menu

6. Create functions to handle each of the following (use SQL queries to accomplish this):
  --  - view all departments (department name and id)
  --  - view all roles (job title, role id, department that role belongs to, and salary for role)
 --   - view all employess (employee id, first name ,last name, job title, department, salarie, mangers they report to)
  --  - add a department (prompted to enter name of department and it's added to the database)
  --  - add a role (proompted to add name salary and department)
  --  - add an employee (employee first name, lasts name, role, manager)
  --  - update an employee role (promted to select an employee to update and their new role)
  --  - Exit

EXTRAS if i can figure out the rest otherwise ignore
    - View all employees by department (bonus)
    - View all employees by manager(bonus)
    - Remove employee (bonus)
    - Remove role (bonus)
    - Update employee manager (bonus)

7. Call the function to start the prompts