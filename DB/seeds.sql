use employeeDB;

-- Departments ----------------
INSERT INTO departments (dept_id, name) VALUES (1, 'Service Delivery');
INSERT INTO departments (dept_id, name) VALUES (2, 'Operations');
INSERT INTO departments (dept_id, name) VALUES (3, 'Technology');
INSERT INTO departments (dept_id, name) VALUES (4, 'Sales');
INSERT INTO departments (dept_id, name) VALUES (5, 'Finance');

-- Roles ----------------

-- Service Delivery ----------------
INSERT INTO role (title, salary, dept_id) VALUES ("Business Owner", 150000, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Head Coach", 125000, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Assistant Coach", 100000, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Apprenticeship", 75000, 1);

-- Operations ----------------
INSERT INTO role (title, salary, dept_id)  VALUES ("COO", 130000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Ops Manager", 115000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Ops Rep", 100000, 2);

-- Technology ----------------
INSERT INTO role (title, salary, dept_id) VALUES ("CTO", 150000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("CDO", 150000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Senior Developer", 125000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Developer", 100000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Designer", 100000, 3);

-- Sales ----------------
INSERT INTO role (title, salary, dept_id) VALUES ("Head of Sales", 150000, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Sales Manager", 125000, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Sales Rep", 100000, 4);

-- Finance ----------------
INSERT INTO role (title, salary, dept_id) VALUES ("CFO", 150000, 5);
INSERT INTO role (title, salary, dept_id) VALUES ("Finance  Manager", 125000, 5);
INSERT INTO role (title, salary, dept_id) VALUES ("Finance Rep", 100000, 5);

-- Emplyees ----------------

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Adam', 'Jones',1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Katie', 'Jones',2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jenna', 'Lacognata',3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Clarence', 'Stone',9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mike', 'Cappelleri',8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Manuel', 'Pierre',11);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kyle', 'Brazier',11);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Riley', 'Smith',12);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Audrey', 'Richardson',15);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Claire', 'Wilson',3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dan', 'Wallenstein',3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Stan', 'Gonzalez',16);


