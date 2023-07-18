function calculatePower(a, b) {
    try {
	const result = Math.pow(a, b);
	if (isNaN(result)) {
	    throw "Result is not a number";
	}
	return result;
    } catch (error) {
	return -1;
    }
}

module.exports = {calculatePower}
