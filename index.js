const mysql = require("mysql2");
const inquirer = require("inquirer");
const { findAllDepartments, findAllEmployees } = require("./db");
const consoleTable = require("console.table")

const promptMenu = [
    {
      type: "list",
      name: "menu",
      message: "Select Option:",
      choices: [
        "View Employees",
        "View departments",
        "View roles",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Exit",
      ],
    },
  ];

  function ask() {
    inquirer.prompt(promptMenu).then((answers) => {
      switch (answers.menu) {
        case "View all Employees":
          viewAllEmployees();
          break;
        case "View all departments":
          viewAllDepts();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add a department":
            addDepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        default:
          process.exit();
      }
    });
  }

  function viewAllEmployees() {
    db.findAllEmployees()
      .then(([data]) => {
        console.table(data);
      })
      .then(() => ask());
  }

  function viewAllDepts() {
    db.findAllDepartments()
      .then(([data]) => {
        console.table(data);
      })
      .then(() => ask());
  }
  
  function viewAllRoles() {
    db.findAllRoles()
      .then(([data]) => {
        console.table(data);
      })
      .then(() => ask());
  }
  
  function addDepartment() {
    return (
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
            validate: (nameInput) => {
              if (nameInput) {
                return true;
              } else {
                console.log("Please enter department");
                return false;
              }
            },
          },
        ])
        .then((answer) => {
          db.createDepartment(answer).then(() => ask());
        })
    );
  }

  function addARole() {
    db.findAllDepartments().then(([data]) => {
      let dept = data;
      const deptList = data.map(({ name, id }) => ({
        name: name,
        value: id,
      }));
      return inquirer
        .prompt([
          {
            type: "input",
            name: "roleName",
            message: "What's the name of the role?",
            validate: (roleNameInput) => {
              if (roleNameInput) {
                return true;
              } else {
                console.log("Please enter role name");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salaryTotal",
            message: "What is the salary for this role?",
            validate: (roleSalaryTotal) => {
              if (roleSalaryTotal) {
                return true;
              } else {
                console.log("Please enter salary of this role");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "deptID",
            message: "What is the department id number?",
            choices: deptList,
          },
        ])
        .then((answer) => {
          db.createRole(answer).then(() => ask());
        });
    });
  }