/**
 * Function that returns the Fibonacci number requested.
 * @param {number} input - Fibonacci number to return.
 * @return {number} - Fibonacci number. 
 */
function fibonacci(number) {
    // First version:
    // return 0;

    // Next version:
    // if (number === 0) return 0;
    // return 1;

    // Next version:
    // if (number === 0) return 0;
    // if (number == 1) return 1;
    // return fibonacci(number-1) + fibonacci(number-2);

    // Next version:
    if (number < 0) throw new Error('Input must be 0 or greater');
    if (number === 0) return 0;
    if (number == 1) return 1;
    return fibonacci(number-1) + fibonacci(number-2);

    // if (number < 0) throw new Error('Input number must not be negative');
    // if (!Number.isInteger(number)) throw new Error('Input must be an integer');
    // const sequence = [0, 1];
    // for (i = 2; i <= number; i++) {
    //     sequence[i] = sequence[i - 2] + sequence[i - 1];
    // }
    // return sequence[i];
}

module.exports = fibonacci;