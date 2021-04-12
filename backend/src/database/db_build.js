//One time operation required to start the project - creates db from file and adds basic values required for correct run

const fs = require("fs");
const {runInsertQuery} = require('./db.js')
const path = require('path');

const databaseCreate = fs.readFileSync(path.join(__dirname, '/database_create.sql')).toString();

runInsertQuery(databaseCreate);