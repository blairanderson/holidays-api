const data = require("../public/holiday-data.json")

exports.handler = async (event, context) => {
  return { statusCode: 200, body: JSON.stringify(data) };
};
