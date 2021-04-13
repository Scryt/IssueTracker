const {runSelectQuery} = require('./db')

getStatuses = async (status_tag) => {
    let query = `
        SELECT S.id,
               S.tag,
               D.en AS status_en
        FROM Status AS S
                 LEFT JOIN Dictionary D on S.dictionary_id = D.id
        WHERE is_active = 1
    `

    const results = await runSelectQuery(query);
    let resultsObject = {}
    let tArray = []
    results.forEach(record => {
        tArray.push(record)
    })

    resultsObject["issues"] = tArray;
    return JSON.stringify(resultsObject);
};

module.exports = {
    getStatuses
}