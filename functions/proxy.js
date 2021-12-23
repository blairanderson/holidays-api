const fetch = require("node-fetch");

const API_ENDPOINT = `https://holidayapi.com/v1/holidays?pretty&key=${process.env.HOLIDAY_KEY}&country=AD`;

exports.handler = async (event, context) => {
  const thisYear = new Date().getFullYear()
  const validYears = [
    thisYear - 1,
    thisYear,
    thisYear + 1
  ]
  try {
    const year = parseInt(event.queryStringParameters.year);
    const validYear = validYears.contains(year) ? year : thisYear;
    const response = await fetch(`${API_ENDPOINT}&year=${validYear}`);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
