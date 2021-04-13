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

runInsertQuery = (query, params) => {
    const db = dbOpenConnection();

    db.serialize(() => {
        db.run("BEGIN TRANSACTION;");

        if (params !== undefined) {
            db.run(query, params, (err) => {
                if (err) throw err;
            });
        } else {
            const queryArr = query.toString().split(");");
            queryArr.forEach(singleQuery => {
                if (singleQuery === "") {
                    return;
                }

                singleQuery += ");";
                db.run(singleQuery, err => {
                    if (err) throw err;
                });
            });
        }

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