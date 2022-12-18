const express = require('express');
const mysql = require('mysql');

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

// connect to MySQL
db.connect((error) => {
  if (error) throw error;
  console.log('MySQL connected!');
});

const app = express();

// connect database
app.get('/create_db', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, error => {
    if (error) throw error;
    res.send('db created!');
  });
});

// create table
app.get('/create_employee', (req, res) => {
  let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, error => {
    if (error) throw error;
    res.send('Table "employee" created!');
  });
});

// insert employee
app.get('/employee', (req, res) => {
  let post = {
    name: 'John Depp',
    designation: 'Chief'
  };
  let sql = 'INSERT INTO employee SET ?';
  db.query(sql, post, error => {
    if (error) throw error;
    res.send('Employee added!');
  });
});

// select employees
app.get('/get_employees', (req, res) => {
  let sql = 'SELECT * FROM employee';
  db.query(sql, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.send('Employees fetched!');
  });
});

// update employee
app.get('/update_employee/:id', (req, res) => {
  let newName = 'Jake';
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
  db.query(sql, error => {
    if (error) throw error;
    res.send('Employee updated!');
  });
});

// delete employee
app.get('/delete_employee/:id', (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  db.query(sql, error => {
    if (error) throw error;
    res.send('Employee deleted!');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000!');
});
