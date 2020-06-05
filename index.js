function add(stringNumbers) {
    if (stringNumbers.length === 0) {
        return 0;
    }
    // Find the delimiter which is in a group between the slashes and newline character
    const customDelimiterExist = stringNumbers.match(/\/\/(.+)\n/);
    // Use regex for the split
    let delimiter = /,/;
    if (customDelimiterExist !== null) {
        const controlCode = customDelimiterExist[0];
        if (customDelimiterExist[1] !== ',') {
            // Transform the custom delimiter into a list of delimiters if a comma exist between
            // them. 
            delimiter = new RegExp(customDelimiterExist[1]
                .split(',')
                .map(delim => delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                .join('|'));
        }
        stringNumbers = stringNumbers.replace(controlCode, '');
    } else {
        stringNumbers = stringNumbers.replace('\n', '');
    }
    const numbers = stringNumbers.split(delimiter);
    let value = 0;
    for (let i = 0; i < numbers.length; i += 1) {
        const num =  Number.parseInt(numbers[i]);
        if (num <= 1000) {
            if (num < 0) {
                throw new Error(`Negatives not allowed: ${numbers}`)
            } 
            value += num;
        }
    }
    
    return value;
}

module.exports = { add };

// Had trouble passing values through the command line due to the newline character, so the results are
// excuted here. Actual tests in add.test.js.
console.log('1,2,3', add('1,2,3'));
console.log('\\n1,2,3', add('\n1,2,3'));
console.log('//!\\n1!2!3', add('//!\n1!2!3'));
console.log('//!,.\\n5!4.3', add('//!,.\n5!4.3'));