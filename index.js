const inquirer = require("inquirer"); //inquirer package -npm i inquirer
const mysql = require('mysql2'); //mysql2package -npm i mysql2
const consoleTable = require('console.table') //package for npm i console.table
const dotenv = require('dotenv') // npm i dotenv --save

// Database Connection -------------------------------------------------------------------------------------------------------------------------------------------------------------
    const db = mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username --USE DOTENV TO HIDE VARIABLES *TODO*
        user: 'root',
        //  Add MySQL password here --USE DOTENV TO HIDE VARIABLES *TODO*
        password: '',
        database: 'company_db'
        },
        console.log(`Connected to the company_db database.`)
    );
    db.connect((err) => {
        if (err) throw err;
        promptUser();
    });

    //Inquirer Options to call functions with user input-------------------------------------------------------------------------------------------------------------------------------
    function promptUser() {
        inquirer.prompt([
            {
            type: 'list',
            message: "Big-Broth0r-Employee-Tracker V1.0.1: Select an option to interact with the database",
            name: 'questions',
            choices: ['View all departments','View all employees','View all roles','Add a department','Add a role','Add an employee','Update an employee role', 'Quit']
            },
        
        ])
        
            .then((response) => {
                
                if(response.questions == 'View all departments'){
                    viewallDepartments();
                }
                else if(response.questions == 'View all employees')
                {
                    viewallEmployees();
                }
                else if(response.questions == 'View all roles')
                {
                    viewallRoles();
                }
                else if(response.questions == 'Add a department')
                {
                    addDepartments();
                }
                else if(response.questions == 'Add a role')
                {
                    addRole();
                }
                else if(response.questions == 'Add an employee')
                {
                    addEmployee();
                }
                else if (response.question == 'Update an employee role'){
                    updateRole();
                } else {
                    return 'Goodbye!'
                }

            // console.log(response);
            });
    }

