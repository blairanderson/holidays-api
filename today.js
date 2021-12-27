// node today.js
const data = require("./public/holiday-data.json")
const {filterDates} = require("./filterDates.js");

const filterDate = "observedOn";
const padding = 7
const today = filterDates(data.holidays, filterDate, padding)

console.log(JSON.stringify({today, filterDate, padding}, null, 4))
