const db = require('./index.js')

class Query {
    constructor(db) {
        this.db = db
    }

    findAllDepartments() {
        return this.db.promise().query('SELECT * FROM department;')
    }

    findAllRoles() {
        return this.db.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    findEmployees() {
        return this.db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ",manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON  manager.id = employee.manager_id;')
    }

    createDepartment(department) {
        return this.db.promise().query('INSERT INTO department SET ?', department)
    }

    createRole(allRoles) {
        return this.db.promise().query('INSERT INTO role SET ?', allRoles)
    }

    createEmployee(emp) {
        return this.db.promise().query('INSERT INTO employee SET ?', emp)
    }

    updateEmployeeRole(empId, roleId) {
        return this.db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, empId])
    }
}

module.exports = new Query(db)