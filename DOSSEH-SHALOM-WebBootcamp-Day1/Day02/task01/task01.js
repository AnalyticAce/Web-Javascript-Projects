function sumOfOddNumbers(arr) {
    return arr.reduce((sum, item) => {
	if (item % 2 !== 0) {
	    sum += item;
	}
	return sum;
    }, 0);
}

module.exports = {sumOfOddNumbers}
