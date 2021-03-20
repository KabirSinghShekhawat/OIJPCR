const ISO8601ToDate = (date) => {
    // date = date.split("T")[0];
    const date_ISO8601 = new Date(date);
    const year = date_ISO8601.getFullYear();
    let month = date_ISO8601.getMonth() + 1;
    let dt = date_ISO8601.getDate();

    if (dt < 10) dt = '0' + dt;
    if (month < 10) month = '0' + month;

    const ddMMYYYY = {
        date: dt,
        month: month,
        year: year
    }

    return ddMMYYYY;
}

const getDate = (ISO8086_date) => {
    const date = ISO8601ToDate(ISO8086_date)

    const monthEnum = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const month = monthEnum[date.month]
    return `${date.date} ${month}, ${date.year}`
}

module.exports = getDate;