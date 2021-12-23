const data = require("../holiday-data.json")

exports.handler = async (event, context) => {
  return { statusCode: 200, body: JSON.stringify({ data }) };
};
