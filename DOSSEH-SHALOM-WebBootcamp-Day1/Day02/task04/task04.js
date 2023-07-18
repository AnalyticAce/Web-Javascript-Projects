function isFloat(x) {
    return Number.isFinite(x) && !Number.isInteger(x);
}

function isPerfectSquare(num) {
    const sqrt = Math.sqrt(num);
    return isFloat(sqrt) ? false : true;
}

module.exports = {isPerfectSquare}
