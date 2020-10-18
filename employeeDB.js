const inquirer = require("inquirer");
const mysql = require("mysql");
const cFonts = require("cfonts");

console.log(
  cFonts.say("Employee|Tracker|Application", {
    font: "chrome", // define the font face
    align: "center", // define text alignment
    colors: ["gray"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: true, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  })
);

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Faith2323", //Enter your MySQL password here
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  startProgram();
});

function startProgram() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.action) {
        case "View All Departments":
          viewAllDepts();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewAllEmp();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Update Employee Role":
          updateEmp();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// View Queries
const viewAllDepts = () => {
  let query = "SELECT dept_id AS ID, name AS Department FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startProgram();
  });
};

const viewAllRoles = () => {
  let query =
    "SELECT r.role_id AS ID, r.title AS Role, d.name AS Department \
    FROM role r \
    JOIN departments d \
    ON r.dept_id = d.dept_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startProgram();
  });
};

const viewAllEmp = () => {
  let query =
    "SELECT first_name, last_name, title, salary FROM employee JOIN role ON employee.role_id = role.role_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("");
    console.table(res);
    startProgram();
  });
};

// Add Queries
const addDept = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the new department?",
      },
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO departments SET ? ",
        {
          name: answers.name,
        },
        function (err) {
          if (err) throw err;
          console.log("");
          viewAllDepts();
        }
      );
    });
};

// Add Role // Experimented with Promises
const query = (q, d = {}) =>
  new Promise((resolve, reject) => {
    connection.query(q, d, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const addRole = async () => {
  var q = "SELECT dept_id AS value, name FROM departments";
  try {
    const departments = await query(q);
    const answers = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "dept_id",
        type: "list",
        message: "What is the department of the new role?",
        choices: departments,
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
        validate: function (val) {
          return !isNaN(val);
        },
      },
    ]);
    await query("INSERT INTO role SET ? ", answers);
    viewAllRoles();
  } catch (error) {
    console.log(error);
  }
};

//Add Queries
const addEmp = async () => {
  var q = "SELECT role_id AS value, title AS name FROM role"; // [{name: '', value: ''}]
  try {
    const roles = await query(q);
    const answers = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the the new employee's role?",
        choices: roles,
      },
    ]);
    await query("INSERT INTO employee SET ? ", answers);
    viewAllEmp();
  } catch (error) {
    console.log(error);
  }
};

// Update Employee

const updateEmp = async () => {
  var e_qry =
    "SELECT employee_id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee";
  var r_qry = "SELECT role_id AS value, title AS name FROM role"; // [{name: '', value: ''}]
  const df_emp_qry = "SELECT * FROM employee WHERE employee_id = ?";
  const u_qry = "UPDATE employee SET ? WHERE employee_id = ?";

  try {
    const emps = await query(e_qry);
    const roles = await query(r_qry);

    const { employee_id } = await inquirer.prompt({
      name: "employee_id",
      type: "list",
      message: "Which employee?",
      choices: emps,
    });

    const defaultVals = await query(df_emp_qry, [employee_id]);

    const updates = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the new employee's first name?",
        default: defaultVals[0].first_name,
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?",
        default: defaultVals[0].last_name,
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the the new employee's role?",
        choices: roles,
      },
    ]);

    const data = [updates, employee_id];
    await query(u_qry, data);
    viewAllEmp();
  } catch (error) {
    console.log(error);
  }
};

const _updateEmp = async () => {
  var q =
    "SELECT employee.last_name, employee.role_id FROM employee JOIN role ON employee.role_id = role.role_id";
  try {
    const roles = await query(q);
    const answers = await inquirer.prompt([
      {
        name: "last_name",
        type: "rawlist",
        choices: function () {
          let lastName = [];
          for (var i = 0; i < res.length; i++) {
            lastName.push(res[i].lastName);
          }
          return lastName;
        },
        message: "What is the employee's last name? ",
      },
      {
        name: "role",
        type: "rawlist",
        message: "What is the employee's new title? ",
        choices: viewAllRoles(),
      },
    ]);
    await query("UPDATE employee SET WHERE ?", answers);
    viewAllRoles();
  } catch (error) {
    console.log(error);
  }
};
