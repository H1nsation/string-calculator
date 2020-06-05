const {add} = require('./index')

describe('Add Test', () => {
    describe('Simple Test - Part 1', () => {
      it('should return 0 when input is empty string', () => {
        expect(add('')).toBe(0);
      });
      it('should add for comma seperated string', () => {
        expect(add('1,2,3')).toBe(6);
      });
    });
    describe('Ignore new line - Part 2', () => {
        it('should ignore new line indicator before comma', () => {
            expect(add('1\n,2,3')).toBe(6);
        });
        it('should ignore new line indicator after comma', () => {
            expect(add('1,\n2,3')).toBe(6);
        });
        it('should ignore multiple new line indicators', () => {
            expect(add('\n1,\n2,\n3')).toBe(6);
        });
    });
    describe('Support custom delimiters - Part 3', () => {
        it('should support seperate semicolon delimiters ', () => {
            expect(add('//;\n1;3;4')).toBe(8);
        });
        it('should support dollar sign delimiters ', () => {
            expect(add('//$\n12$15$32')).toBe(59);
        });
        it('should support @ sign delimiters ', () => {
            expect(add('//@\n2@3@8')).toBe(13);
        }); 
        it('should raise an exception if a negative number exists in the list ', () => {
            expect(() => add('//@\n-2@3@8'))
                .toThrowError(new Error('Negatives not allowed: -2,3,8'));
        }); 
    });
    describe('Bonus', () => {
        it('should ignore values greater than 1000', () => {
            expect(add('1001,2')).toBe(2);
        });
        it('should accept arbitrary length delimiters', () => {
            expect(add("//***\n1***2***3")).toBe(6);
        });
        it('should accept multiple delimiters', () => {
            expect(add("//!,$\n1!2$3")).toBe(6);
        });
        it('should accept multiple and arbitrary length delimiters', () => {
            expect(add("//!!!!!,..\n1!!!!!2..3")).toBe(6);
        });
    })
  });