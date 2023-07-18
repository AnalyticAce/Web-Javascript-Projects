function reverseWords(str) {
    let reverseWordArr = str.split(" ").map(word => word.split("")/*.reverse()*/.join(""));
    return reverseWordArr.reverse().join(" ");
}

module.exports = {reverseWords}
