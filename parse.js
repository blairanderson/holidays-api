const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://www.federalreserve.gov/aboutthefed/k8.htm';
const holidays = []
const DEBUG = false
const DAY_OF_WEEK = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function prettyDate(date) {
  return date.toISOString().slice(0,10);
}


function ParseFed(html){
  const $ = cheerio.load(html)
  if (DEBUG) {console.log(html)}
  const headerEls = $("table.table thead tr th")
  const headers = []
  const rows = []
  for (var i = 0; i < headerEls.length; i++) {
    headers.push($(headerEls[i]).text())
  }
  console.dir({headers})
  const bodyRows = $("table.table tbody tr")


  for (var i = 0; i < bodyRows.length; i++) {
    const item = $(bodyRows[i])
    const name = item.children("th").text()
    const dates = item.children("td")

    for (let step = 0; step < 5; step++) {
      // Runs 5 times, with values of step 0 through 4.
      const stepDate = new Date(`${dates[step].children[0].data} ${headers[step]}`)
      const getDay = stepDate.getDay();
      const dayOfWeek = DAY_OF_WEEK[getDay]
      const newState = {
        name: name,
        prettyDate: prettyDate(stepDate),
        dayOfWeek,
      }

      if (getDay == 0) {
        newState["observedOn"] = prettyDate(addDays(stepDate, 1));
      } else if (getDay == 6) {
        newState["observedOn"] = prettyDate(addDays(stepDate, -1));
      } else {
        newState["observedOn"] = newState.prettyDate
      }

      holidays.push(newState)
    }

  }

  const sortedHolidays = holidays.slice().sort((a,b) => {
    return new Date(a.prettyDate) - new Date(b.prettyDate);
  })

  const json = JSON.stringify({holidays: sortedHolidays}, null, 4)
  if (DEBUG) {console.log(json)}

  fs.writeFile('public/holiday-data.json', json, 'utf8', function(){
    console.log("done writing / public/holiday-data.json")
  });
}

function Errors(err){
  console.log(err)
}

rp(url).then(ParseFed).catch(Errors);
