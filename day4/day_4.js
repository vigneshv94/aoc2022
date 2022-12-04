const fs = require('fs');

try {
  let total = 0;
  const cleanUpSummary = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day4/day_4_input.txt', 'utf8').split('\n').slice(0);

  cleanUpSummary.forEach(summary => {
    const pairs = summary.split(",");
    const pair1Range = pairs[0].split("-");
    const pair2Range = pairs[1].split("-")

    const pair1Sequence = generateSequenceNumbers(Number(pair1Range[0]), Number(pair1Range[1])+1);
    const pair2Sequence = generateSequenceNumbers(Number(pair2Range[0]), Number(pair2Range[1])+1)
    console.log(pair1Range);
    console.log(pair2Range);
    total += checkIfOverlaps(pair1Sequence, pair2Sequence);
  })
  
  console.log('total', total)
} catch (err) {
  console.error(err);
}

function generateSequenceNumbers(start, end) {
    return Array(end - start).fill().map((element, index) => index + start);
}

function checkIfOverlaps(range1, range2) {
    let range1Length = range1.length;
    let range2Length = range2.length;

    range1.forEach(r1 => {
        range2.forEach(r2 => {
            if(r1 === r2) {
                range1Length--;
                range2Length--;
            }
        })
    });
    return range1Length === 0 || range2Length === 0 ? 1 : 0;
}