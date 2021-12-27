
function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}


function filterDates(dates, dateName="prettyDate", padding=7) {
  const today = new Date();
  return dates.filter((row) => {
    const d = new Date(row[dateName]);
    const diff = datediff(today, d)
    if (diff > -padding || diff < padding) {
      return true
    } else {
      return false
    }
  })
}

export default filterDates
