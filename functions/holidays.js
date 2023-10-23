const data = require("../public/holiday-data.json")

exports.handler = async (event, context) => {
  if (process.env.API_KEY === event.queryStringParameters.api_key) {
    return { statusCode: 200, body: JSON.stringify(data) };
  } else {
    return { statusCode: 429, body: JSON.stringify({message: "Please host your own version of this API https://github.com/blairanderson/holidays-api/"}) };
  }
};
