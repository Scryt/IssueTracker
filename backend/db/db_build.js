//One time operation required to start the project - creates db and adds basic values required for correct run

const fs = require("fs");
const sqlite3 = require("sqlite3");

const databaseCreate = fs.readFileSync('./database_create.sql').toString();

const db = new sqlite3.Database('db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Initial db build - Connection started")
})

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");
    db.run("BEGIN TRANSACTION;");

    let queryArr = databaseCreate.toString().split(");");

    queryArr.forEach(query => {
        if(query) {
            query += ");";
            console.log(query)
            db.run(query, err => {
                if (err) throw err;
            });
        }
    });

    db.run("COMMIT;")
})

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Initial db build - Connection closed")
});