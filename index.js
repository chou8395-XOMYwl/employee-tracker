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
    inquirer.prompt(promptMenu).then((responses) => {
      switch (responses.menu) {
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
          addDept();
          break;
        case "Add a role":
          addRole();
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
  
