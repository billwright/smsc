function fibonacci(number) {
    if (number < 0) throw new Error('Input must be 0 or greater');
    if (number === 0) return 0;
    if (number == 1) return 1;
    return fibonacci(number-1) + fibonacci(number-2);
}

function fibonacci(element) {
    const sequence = [0, 1];
    for (i = 2; i <= element; i++) {
        sequence[i] = sequence[i - 2] + sequence[i - 1];
    }
    return sequence[element];
}
console.log('fibonacci(24) is', fibonacci(24));

describe("fibonacci", () => {
    test("returns 46368 for fibonacci(24)", () => {
      expect(fibonacci(24)).toBe(46368);
    });
  
    test("returns 0 for fibonacci(0)", () => {
        expect(fibonacci(0)).toBe(0);
    });
  
    test("returns 1 for fibonacci(1)", () => {
        expect(fibonacci(1)).toBe(1);
    });

    test("throws an error if number is negative", () => {
      expect(() => fibonacci(-1)).toThrow();
    });
  
    test("throws an error if number is not a number", () => {
      expect(() => fibonacci("1")).toThrow();
    });
  });


// module.exports = fibonacci;