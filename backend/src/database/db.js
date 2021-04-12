const sqlite3 = require("sqlite3");

runQuery = (query) => {
    const db = new sqlite3.Database('db', err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection started")
    })

    db.serialize(() => {
        db.run("PRAGMA foreign_keys = ON;");
        db.run("BEGIN TRANSACTION;");

        let queryArr = query.toString().split(");");

        queryArr.forEach(query => {
            if(query) {
                query += ");";
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
        console.log("Connection closed")
    });
}

module.exports = {
    runQuery
}