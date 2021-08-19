function monthName (month) {
  switch (month) {
    case 1:
      return 'January'
    case 2:
      return 'February'
    case 3:
      return 'March'
    case 4:
      return 'April'
    case 5:
      return 'May'
    case 6:
      return 'June'
    case 7:
      return 'July'
    case 8:
      return 'August'
    case 9:
      return 'September'
    case 10:
      return 'October'
    case 11:
      return 'November'
    case 12:
      return 'December'
    default:
      return 'Not a month'
  }
}

/**
 *
 * @param day {integer} in range [1,31]
 * @returns superscript {string}
 */
function dayName (day) {
  if (day < 1 || day > 31) return 'Not a day'

  const index = day % 10
  switch (index) {
    case  1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function UTCToFormalDate(date) {
  /* yyyy-mm-dd to Month day, year*/
  // dates may begin with 0, like 08, then parseInt() is used.
  /*! always provide radix base when using parseInt() */
  if (date == null) return ''
  date = date.split('-')
  if (date.length < 3) return ''

  let year = date[0]
  let month = monthName(parseInt(date[1], 10))
  let superScript = dayName(date[2])

  return {
    year,
    month,
    superScript,
    day: parseInt(date[2], 10)
  }
}

export default UTCToFormalDate