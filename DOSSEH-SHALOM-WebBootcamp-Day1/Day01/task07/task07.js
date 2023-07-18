function isLeapYear(year)
{
    leap = year % 4
    if (leap == 0) {
	return true
    } else {
	return false
    }
}

module.exports = {isLeapYear}
