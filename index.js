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

  function prompt() {
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
          updateEmployeeRole();
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
      .then(() => prompt());
  }

  function viewAllDepts() {
    db.findAllDepartments()
      .then(([data]) => {
        console.table(data);
      })
      .then(() => prompt());
  }
  
  function viewAllRoles() {
    db.findAllRoles()
      .then(([data]) => {
        console.table(data);
      })
      .then(() => prompt());
  }
  
  function addDepartment() {
    return (
      inquirer
        .prompt([
          {
            type: "input",
            name: "name",
            message: "What department would you like to add?",
          },
        ])
        .then((answer) => {
          db.createDepartment(answer).then(() => prompt());
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
        
          },
          {
            type: "input",
            name: "salaryTotal",
            message: "What is the salary for this role?",
          },
          {
            type: "list",
            name: "deptID",
            message: "What is the department id number?",
            choices: deptList,
          },
        ])
        .then((answer) => {
          db.createRole(answer).then(() => prompt());
        });
    });
  }

  function addEmployee() {
    db.findAllRoles().then(([data]) => {
      let allRoles = data;
      const roleInfo = allRoles.map(({ roleName, id }) => ({
        name: roleName,
        value: id,
      }));
      db.findAllEmployees().then(([data]) => {
        let emp = data;
        const allEmployees = emp.map(({ nameFirst, nameLast, id }) => ({
          name: `${nameFirst}  ${nameLast}`,
          value: id,
        }));
  
        allEmployees.unshift({
          name: "none",
          value: null,
        });
  
        inquirer
          .prompt([
            {
              type: "input",
              message: "What's the employees first name?",
              name: "nameFirst",
            },
            {
              type: "input",
              name: "nameLast",
              message: "What's the employees last name?",
            },
            {
              type: "list",
              name: "idRole",
              message: "What's the employees id role number?",
              choices: roleInfo,
            },
            {
              type: "list",
              name: "idManager",
              message: "What's the managers id?",
              choices: allEmployees,
            },
          ])
          .then((answer) => {
            db.createEmployee(answer).then(() => prompt());
          });
      });
    });
  }

  function updateEmployeeRole() {
    db.findAllEmployees().then(([data]) => {
      let emp = data;
      const allEmployees = emp.map(({ nameFirst, nameLast, id }) => ({
        name: `${nameFirst} ${nameLast}`,
        value: id,
      }));
  
      db.findRoles().then(([data]) => {
        let allRoles = data;
        const roleInfo = allRoles.map(({ id, roleName }) => ({
          name: `${roleName}`,
          value: id,
        }));
  
       inquirer
          .prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Which employee would you like to update?",
              choices: allEmployees,
            },
            {
              type: "list",
              name: "roleID",
              message: "Which role will this employee be updated with?",
              choices: roleInfo,
            },
          ])
          .then((answer) => {
            const roleID = answer.roleID;
            const employeeId = answer.employeeId;
            db.updatedEmpRole(employeeId, roleID).then(() => prompt());
          });
      });
    });
  }

  prompt();