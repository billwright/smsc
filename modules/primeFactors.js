/**
 * Function that returns the prime factors of a number.
 * @param {number} input - Input number to factor.
 * @return {number[]} - A list of integers. 
 */
function primeFactors(input) {
    const factors = [];

    let current = input;
    for (i=2; i <= input; i++){
        while (current % i == 0) {
            factors.push(i);
            current /= i;
        }
    };

    return factors;
}

module.exports = primeFactors;
