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

//Functions that interact with database-------------------------------------------------------------------------------------------------------------

    // Displays a table of all departments with names and IDs (department specific IDs)
    function viewallDepartments(){
        const sql = `SELECT * FROM departments`;
        db.query(sql,(err,result)=>{
                if (err){
                    throw err
                }
                console.table(result);
                promptUser();
            })
        }
    
        // Displays all roles with job title, role id (job specific), department id (department employee belongs to) and salary
        function viewallRoles(){
            const sql=`SELECT r.title,r.salary,d.name,d.id FROM role AS r JOIN department AS d ON d.id = r.department_id`;
        db.query(sql,(err,result)=>{
            if (err)
                throw err
            
           console.table(result);
           question();
        })
        }
    
        // Displays a table showing employees
        function viewallEmployees(){
            const sql = `SELECT * FROM employees`;
            db.query(sql,(err,result) => {
                if(err){
                    throw err
                }
                console.table(result);
                promptUser();
            })
        }
    
        //Prompts user to enter department name and adds department to database
        function addDepartments(){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'deptName',
                    message: 'What is the name of the department you wish to add?'
                }
            ]) 
            .then((response) => {
               
                const sql=`INSERT INTO department (name) VALUES (?)`; //References name from department in schema.sql
                db.query(sql,response.deptName,(err,result)=>{
                    if (err)
                    throw err
                    console.table(result);
                    question();
              });  
        
            });  
           
        }
    
        //Prompts user to enter name, salary, and department for the role and adds role to the database
        function addRole(){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role you wish to add?'
                },
                {
                    type: 'input',
                    name:'salary',
                    message: 'what is the salary of the role ?'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Which department does the role belong to ?'
                    //Choices:     //department name(viewalldepartments)
                }
            ]) 
            .then((response) => {
               
                const sql=`INSERT INTO role SET ? `;//use name from role in schema.sql/seeds(dept id ,title ,salary)
                db.query(sql,response,(err,result)=>{
                    if (err)
                    throw err
                    console.log(result);
                    question();
              }); 
        
            });  
        }
    
        // Prompts user to enter employee's first name, last name, role and manager, then adds employee to the database
        function addEmployee(){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of this employee:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of this employee:'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role of this employee?'
                  //Choices:         //role title display-
                },
                {
                    type: 'input',
                    name: 'manager_id' ,
                    message: 'Who is the manager of this employee?'
                   //Choices:            //none,display employee first and last name
                }
            ])
            .then((response) => {
               
                const sql=`INSERT INTO employee SET ?`;//use name from role in schema.sql/seeds(first name, lastname,role id, manager id)
                db.query(sql,response,(err,result)=>{
                    if (err)
                    throw err
                    console.log(result);
                    question();
              });  
            });  
        }
    
        // Prompts user to select an employee to update role and add that information to the database
        function updateRole(){
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee',
                    message: 'Which employee role do you wish to update?'
                   //Choice:                   //need emp name 
                },
                {
                    type: 'input',
                    name:  "role"   ,
                    message: 'Which role do you wish to assign the selected employee ?'
                   //Choices:                    //need role title 
                }
         
            ])
        
            .then((response) => {
               
                const sql=`UPDATE employee SET role_id = ? WHERE id = ?`;
                db.query(sql,[response],(err,result)=>{
                    if (err)
                    throw err
                    console.log(result);
                    question(); 
              });  
            }); 
           
        }
    
