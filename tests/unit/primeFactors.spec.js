const chai = require('chai');
const expect = chai.expect;
const primeFactors = require('../../modules/primeFactors');

// Definition of Done:


// Initial test list:
//    2    -  2    x
//     4  ->  2,2  x
//     16 -> 2;2;2;2
//      3  -> 3
//      6  -> 2;3
// 

describe('primeFactors', () => {
    it('returns [2] for primeFactors(2)', () => {
        expect(primeFactors(2)).to.eql([2]);
    });
    it('returns [2,2] for primeFactors(4)', () => {
        expect(primeFactors(4)).to.eql([2,2]);
    });

    it('returns [2,2,2,2] for primeFactors(16)', () => {
        expect(primeFactors(16)).to.eql([2,2,2,2]);
    });

    it('returns [3] for primeFactors(3)', () => {
        expect(primeFactors(3)).to.eql([3]);
    });
});
