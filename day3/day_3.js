const fs = require('fs');

try {
  const compartmentList = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day3/day_3_input.txt', 'utf8').split('\n').slice(0);
  const alphabetPositions = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let totalScore = 0;
  
  compartmentList.forEach(compartment => {
    let commonString = getCommonString(compartment);
    if(commonString) {
        totalScore += alphabetPositions.indexOf(commonString) + 1;
    }
  });
  console.log('totalScore', totalScore);
} catch (err) {
  console.error(err);
}
//vJrwpWtwJgWr|hcsFMMfFFhFp

function getCommonString(compartment) {
    let commonString;
    let leftPointer = 0;
    let rightPointer = compartment.length-1;
    while(leftPointer < compartment.length/2) {
        while(rightPointer > (compartment.length/2) - 1) {
            if (compartment.charAt(leftPointer) === compartment.charAt(rightPointer)) {
                commonString = compartment.charAt(rightPointer);
                break;
            } else {
                rightPointer--;
            }
        }
        rightPointer = compartment.length-1
        leftPointer++;
    }
    if(!commonString) {
        console.log(compartment)
        console.log("its null")
    }
    return commonString;  
}