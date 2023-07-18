function calculateSum(arr) {
    return arr.reduce((sum, item) => sum + item, 0);
}

module.exports = {calculateSum}
