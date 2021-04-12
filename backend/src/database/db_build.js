//One time operation required to start the project - creates db from file and adds basic values required for correct run

const fs = require("fs");
const db = require('./db')

const databaseCreate = fs.readFileSync('./database_create.sql').toString();

db.runQuery(databaseCreate)