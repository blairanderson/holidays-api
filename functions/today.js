const data = require("../public/holiday-data.json")
const filterDates = require("../today.js");

exports.handler = async (event, context) => {
  const today = filterDates(data.holidays, 'prettyDate', 7)

  return { statusCode: 200, body: JSON.stringify({today, filterDate: "prettyDate", padding: 7}) };
};
