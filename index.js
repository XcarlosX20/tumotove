
const express = require('express');
const path = require('path');
const app = express()
const port = 3000
// app.set('view engine', 'pug');
// app.set("views", path.join(__dirname, "/src/views"));
// app.get('/', (req, res) => {
//   res.render('home', {title: 'hello world'})
// })
const pg = require("pg");
// import {
//   DB_DATABASE,
//   DB_HOST,
//   DB_PASSWORD,
//   DB_PORT,
//   DB_USER,
// } from "./config.js";

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  database: 'tumotove',
  port: '5432',
});
const getBikes = async (req, res) => {
  const response = await pool.query("SELECT * from motocicletas");
  res.status(200).json(response.rows);
};
app.get('/', getBikes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})