const sqlite3 = require("sqlite3");
const path = require('path');

dbOpenConnection = () => {
    return new sqlite3.Database(path.join(__dirname, 'database'), err => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection started")
    })
}

dbCloseConnection = (db) => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connection closed")
    });
}

runInsertQuery = (query) => {
    const db = dbOpenConnection()

    db.serialize(() => {
        db.run("PRAGMA foreign_keys = ON;")
            .run("BEGIN TRANSACTION;");

        let queryArr = query.toString().split(");");

        queryArr.forEach(query => {
            if (query) {
                query += ");";
                db.run(query, err => {
                    if (err) throw err;
                });
            }
        });

        db.run("COMMIT;");
    });

    dbCloseConnection(db);
};

runSelectQuery = async (query) => {
    const db = dbOpenConnection()
    const results = await new Promise((resolve, reject) => db.all(query, (err, results) => {
        if (err) {
            reject(err)
        } else {
            resolve(results)
        }
    }))

    dbCloseConnection(db);

    return results
}

module.exports = {
    runInsertQuery,
    runSelectQuery
}