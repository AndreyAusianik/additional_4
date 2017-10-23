module.exports = (first, second) => new BigInteger(first).mull(new BigInteger(second));

const integerLength = Number.MAX_SAFE_INTEGER.toString().length / 2 - 1 | 0;
const numberSplitRegExp = new RegExp(`\\d{1,${integerLength}}(?=(\\d{${integerLength}})*$)`, 'g');

class BigInteger {
    constructor(string) {
        if(string.length > integerLength) {
            this.numberArray = string.match(numberSplitRegExp).map(parseFloat).reverse();
        } else {
            this.numberArray = [+string];
        }
    }

    mull(second) {
        const result = [];
        this.numberArray.forEach((numLeft, i) => {
           second.numberArray.forEach((numRight, j) => {
               result[i + j] = (result[i + j] || 0) + numLeft * numRight;
           });
        });

        result.forEach((element, idx, arr) => {
            const numberStr = element.toString();
            if(numberStr.length > integerLength) {
                const nextRank = +numberStr.slice(0, -integerLength);
                const currentRank = +numberStr.slice(-integerLength);
                arr[idx + 1] = (arr[idx + 1] || 0) + nextRank;
                arr[idx] = currentRank;
            }
        });

        return result.reverse()
            .map(num => '0'.repeat(integerLength - num.toString().length) + num)
            .join``.replace(/^0+(?!$)/, '');
    }
}
