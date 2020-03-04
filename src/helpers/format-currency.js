/**
 * Takes in the number and produces a currency formatted
 *  string for display.
 *
 * @param {*} num
 */
export const formatCurrency = (num) => {
  const str = num.toString();

  let output = '';

  // every 3 chars add a ,
  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i];

    output = char + output;
    count++;

    if (char === '.') {
      count = 0;
    }

    if (count === 3 && i !== 0) {
      output = ',' + output;
      count = 0;
    }
  }

  return output;
};
