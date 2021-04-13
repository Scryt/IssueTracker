const {runSelectQuery, runInsUpQuery} = require('./db')

getIssues = async (id, status_tag) => {
    //TODO data check
    // if (typeof id !== "number") {
    //     throw(`ID need to be an int but got ${typeof id}` )
    // }
    let query = `
        SELECT I.id,
               title,
               description,
               S.tag,
               D.en  AS status_en,
               S.tag AS status_tag
        FROM Issue AS I
                 LEFT JOIN Status S on S.id = I.status_id
                 LEFT JOIN Dictionary D on S.dictionary_id = D.id
        WHERE S.tag IS NOT "REMOVED";
    `
    //TODO where added to query based on parameters
    //TODO#2 building where query moved to different function as this part will/can be reusable
    //TODO#3 default show all except  removed
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

    const results = await runSelectQuery(query);
    let resultsObject = {}
    let tArray = []
    results.forEach(record => {
        tArray.push(record)
    })

    resultsObject["issues"] = tArray;
    return JSON.stringify(resultsObject);
};

addIssue = async (title, description, status_tag) => {
    status_tag = status_tag || "OPEN";

    const params = {
        "$title": title,
        "$description": description,
        "$status_tag": status_tag
    }

    const query = `INSERT INTO Issue (title, description, status_id)
                   VALUES ($title, $description, (SELECT id FROM Status WHERE tag = $status_tag));`;

    return runInsUpQuery(query, params)
}

removeIssue = async (id) => {
    const params = {"$id": id}
    const query = `UPDATE Issue
                   SET status_id = (SELECT id FROM Status WHERE tag = "REMOVED")
                   WHERE id = $id`
    console.log(query)
    return runInsUpQuery(query, params)
}

updateIssue = async (id, title, description, status_tag) => {
    console.log(id, title, description, status_tag)
    const params = {
        "$id": id,
        "$title": title,
        "$description": description,
        "$status_tag": status_tag
    }

    const query = `UPDATE Issue
                   SET title       = $title,
                       description = $description,
                       status_id   = (SELECT id FROM Status WHERE tag = $status_tag)
                   WHERE id = $id`

    return runInsUpQuery(query, params)
}

module.exports = {
    getIssues,
    addIssue,
    removeIssue,
    updateIssue
}


// let res = []
// let query = 'SELECT ? FROM EvtAttr WHERE ? LIKE ? limit ?';
// connection.each(query, [field, field, value, limit], (err, row) => {
//     res.push(row[field]);
// });
// return res;