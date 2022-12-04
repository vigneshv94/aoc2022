const fs = require('fs');

try {
  const compartmentList = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day3/day_3_2_input.txt', 'utf8').split('\n').slice(0);
  const alphabetPositions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let totalScore = 0;
  
  for(let i = 0; i < compartmentList.length - 2;) {
    const stringA = compartmentList[i];
    const stringB = compartmentList[i+1];
    const stringC = compartmentList[i+2];
    let commonString = getCommonString(stringA, stringB, stringC) 
    console.log(commonString)
    if (commonString) {
        totalScore += alphabetPositions.indexOf(commonString) + 1;
    }
    i += 3;
  };
  console.log('totalScore', totalScore);
} catch (err) {
  console.error(err);
}
//vJrwpWtwJgWr|hcsFMMfFFhFp

function getCommonString(stringA, stringB, stringC) {
    let commonString;

    [...stringA].forEach(a => {
        [...stringB].forEach(b => {
            [...stringC].forEach(c => {
                if (a===b && b===c && c===a) {
                    commonString = a;
                }
            });
        });
    });
    return commonString;  
}
