function factorial(n)
{
    let ans = 1
    if(n > 1) {
	for(let i = n; i >= 1; i--) {
	    ans = ans * i
	}
    }
    return ans
}

module.exports = {factorial}
