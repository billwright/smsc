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
