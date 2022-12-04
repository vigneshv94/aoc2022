const fs = require('fs');

try {
  let totalScore = 0;
  const rock = ['A', 'X'];
  const paper = ['B', 'Y'];
  const scissor = ['C', 'Z'];
  const matchSummary = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day2/day_2_2_input.txt', 'utf8').split('\n').slice(0);
  console.log(matchSummary);
  matchSummary.forEach(summary => {
    const hit = summary.split(' ');
    const opp = hit[0];
    const me = hit[1];
    if (me === 'X') {
      if (rock.includes(opp)) {
        totalScore += 3;
      }
      if (paper.includes(opp)) {
        totalScore += 1
      }
      if (scissor.includes(opp)) {
        totalScore += 2;
      }
    }

    if (me === 'Y') {
      if (rock.includes(opp)) {
        totalScore += 4;
      }
      if (paper.includes(opp)) {
        totalScore += 5;
      }
      if (scissor.includes(opp)) {
        totalScore += 6;
      }
    }

    if (me === 'Z') {
      if (rock.includes(opp)) {
        totalScore += 8;
      }
      if (paper.includes(opp)) {
        totalScore += 9;
      }
      if (scissor.includes(opp)) {
        totalScore += 7;
      }
    }
    console.log(totalScore)
  })
  console.log(totalScore)
} catch (err) {
  console.error(err);
}
