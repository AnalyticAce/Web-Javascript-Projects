function calculateAverage(arr) {
    return arr.reduce((sum, item) => sum + item, 0) / arr.length;
}

module.exports = {calculateAverage};

const numbers = [1, 2, 3, 4, 5];
const average = calculateAverage(numbers);
console.log(average);
