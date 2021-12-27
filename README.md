# Simple Holidays API

[https://holidayapi.netlify.app/](https://holidayapi.netlify.app/)


## US Holiday Resources

- https://www.federalreserve.gov/aboutthefed/k8.htm

### `parse.js`

Scrapes the federal-reserve website for holiday data, and does some light formatting.


### `filterDates.js`

Return all holidays that are AROUND today, within `N` number of days.

`filterDates(holidays, 'prettyDate', 7)`
