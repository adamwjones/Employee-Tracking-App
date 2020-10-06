const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
  //console.clear();
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

///THIS IS WHERE I LEFT OFF //
//////////////////////////////////////////////////////////
// const addRole = () => {
//   var q = "SELECT dept_id AS value, name FROM departments";
//   connection.query(q, function (err, departments) {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           name: "title",
//           type: "input",
//           message: "What is the title of the new role?",
//         },
//         {
//           name: "dept_id",
//           type: "list",
//           message: "What is the title of the new role?",
//           choices: departments, // {name: 'whats displayed', value: 'whats stored'}[]
//         },
//         {
//           name: "salary",
//           type: "input",
//           message: "What is the salary of the new role?",
//           validate: function (val) {
//             return !isNaN(val);
//           },
//         },
//       ])
//       .then(function (answers) {
//         console.log(answers);
//         connection.query("INSERT INTO role SET ? ", answers, function (err) {
//           if (err) throw err;
//           console.log("");
//           viewAllRoles();
//         });
//       });
//   });
// };
const query = (q, d = {}) =>
  new Promise((resolve, reject) => {
    connection.query(q, d, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// const addRole = () => {
//   var q = "SELECT dept_id AS value, name FROM departments";
//   query(q)
//     .then((departments) => {
//       inquirer
//         .prompt([
//           {
//             name: "title",
//             type: "input",
//             message: "What is the title of the new role?",
//           },
//           {
//             name: "dept_id",
//             type: "list",
//             message: "What is the title of the new role?",
//             choices: departments, // {name: 'whats displayed', value: 'whats stored'}[]
//           },
//           {
//             name: "salary",
//             type: "input",
//             message: "What is the salary of the new role?",
//             validate: function (val) {
//               return !isNaN(val);
//             },
//           },
//         ])
//         .then(function (answers) {
//           console.log(answers);
//           connection.query("INSERT INTO role SET ? ", answers, function (err) {
//             if (err) throw err;
//             console.log("");
//             viewAllRoles();
//           });
//         });
//     })
//     .catch((err) => console.log(err));
// };
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
        message: "What is the title of the new role?",
        choices: departments, // {name: 'whats displayed', value: 'whats stored'}[]
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

const addEmp = () => {
  console.log("addEmp");
  connection.end();
};

//Update Queries

const updateEmp = () => {
  console.log("updateEmp");
  connection.end();
};
