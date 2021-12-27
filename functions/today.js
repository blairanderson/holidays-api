const data = require("../public/holiday-data.json")
const {filterDates} = require("../filterDates.js");

const filterDate = "observedOn";
exports.handler = async (event, context) => {
  const padding = validPadding(event.queryStringParameters.padding) || 7;
  const today = filterDates(data.holidays, filterDate, padding);

  return { statusCode: 200, body: JSON.stringify({today, filterDate, padding}) };
};

function validPadding(param){
  const v = parseInt(param)
  return v > 0 && && v < 365 && v;
}
