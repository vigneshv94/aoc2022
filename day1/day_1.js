const fs = require('fs');

try {
  let maxCalories = 0;
  const totalRation = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day1/day_1_input.txt', 'utf8').split('\n').slice(0, -1);
  let sumOfCalories = 0;
  let count = 1;
  let totalCaloriesForEachElfs = [];
  totalRation.forEach(calories => {
    count++;
    if(calories !== '') {
        sumOfCalories += Number(calories);
    } else {
        totalCaloriesForEachElfs.push(sumOfCalories);
        maxCalories = maxCalories < sumOfCalories ? sumOfCalories : maxCalories;
        sumOfCalories = 0;
    }
  });
  let totalCaloriesByTopThree = totalCaloriesForEachElfs
    .sort((a,b)=>b-a)
    .slice(0,3)
    .reduce((a, b) => a + b, 0);
    
  console.log("number of entries", count);
  console.log('maxCalories', maxCalories);
  console.log('totalCaloriesByTopThree', totalCaloriesByTopThree);
} catch (err) {
  console.error(err);
}
