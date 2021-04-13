const {runSelectQuery, runInsertQuery} = require('./db')

getIssues = async (id, status_tag) => {
    // if (typeof id !== "number") {
    //     throw(`ID need to be an int but got ${typeof id}` )
    // }
    let query = `
        SELECT I.id,
               title,
               description,
               S.tag,
               D.en AS status_en
        FROM Issue AS I
                 LEFT JOIN Status S on S.id = I.status_id
                 LEFT JOIN Dictionary D on S.dictionary_id = D.id;
    `
    //TODO where added to query based on parameters
    //TODO#2 building where query moved to different function as this part will/can be reusable
    //
    // let whereQuery = "";
    // let whereParams = "";
    //
    // if (typeof id === "number" && id > 0) {
    //     whereParams += ` WHERE `
    // }
    //
    // if (whereQuery !== "") {
    //
    // }

    const results = await runSelectQuery(query)
    let resultsObject = {};

    results.forEach(record => {
        let recordId = record["id"];
        delete record["id"];
        resultsObject[recordId] = record;
    })

    return JSON.stringify(resultsObject);
};

addIssue = async (title, description, status_tag) => {
    status_tag = status_tag || "OPEN";

    let params =  {
        "$title": title,
        "$description": description,
        "$status_tag": status_tag
    }

    // let params = [title, description, status_tag];
    let query = `INSERT INTO Issue (title, description, status_id)
                 VALUES ($title, $description, (SELECT id FROM Status WHERE tag = $status_tag));`;

    return runInsertQuery(query, params)
}

module.exports = {
    getIssues,
    addIssue
}


// let res = []
// let query = 'SELECT ? FROM EvtAttr WHERE ? LIKE ? limit ?';
// connection.each(query, [field, field, value, limit], (err, row) => {
//     res.push(row[field]);
// });
// return res;