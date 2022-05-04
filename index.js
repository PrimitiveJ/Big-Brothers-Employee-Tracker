const inquirer = require("inquirer");//inquirer package-npm i inquirer
const mysql = require('mysql2');//mysql2package -npm i mysql2
const consoleTable = require('console.table')//package for npm i console.table from  https://www.npmjs.com/package/console.table
const dotenv = require('dotenv')

// Database Connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      //  Add MySQL password here
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );
  db.connect((err) => {
    if (err) throw err;
    promptUser();
  });

//Inquirer Options to call functions with user input

//Functions that interact with database

function viewallDepartments(){}
// Displays a table of all departments with names and IDs (department specific IDs)

function viewallRoles(){}
// Displays all roles with job title, role id (job specific), department id (department employee belongs to) and salary

function viewallEmployees(){}
// Displays a table showing employee 

function addDepartments(){}
//Prompts user to enter department name and adds department to database

function addRole(){}
//Prompts user to enter name, salary, and department for the role and adds role to the database

function addEmployee(){}
// Prompts user to enter employee's first name, last name, role and manager, then adds employee to the database

function updateRole(){}
// Prompts user to select an employee to update role and add that information to the database
