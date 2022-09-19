const data = require("../public/holiday-data.json");
const converter = require('json-2-csv');

exports.handler = async (event, context) => {
  converter.json2csv(data.holidays, (err, csv) => {
    if (err) {
        throw err;
    }

    // render CSV to a file
    return { statusCode: 200, headers: {'Content-Type': 'text/csv'}, body: csv}
    
  });
};

