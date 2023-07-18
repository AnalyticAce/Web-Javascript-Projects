function isPalindrome(str) {
  const clean = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  const reversed = clean.split("").reverse().join("")
  return clean === reversed
}

module.exports = {isPalindrome}
