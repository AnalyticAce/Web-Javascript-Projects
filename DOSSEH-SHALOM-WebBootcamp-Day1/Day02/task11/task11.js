function calculateProduct(arr) {
    return arr.reduce((sum, item) => sum * item, 1);
}

module.exports = {calculateProduct}
