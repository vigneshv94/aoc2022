const fs = require('fs');

try {
  let totalScore = 0;
  const rock = ['A', 'X'];
  const paper = ['B', 'Y'];
  const scissor = ['C', 'Z'];
  const matchSummary = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day2/day_2_test.txt', 'utf8').split('\n').slice(0);
  console.log(matchSummary);
  matchSummary.forEach(summary => {
    const hit = summary.split(' ');
    const opp = hit[0];
    const me = hit[1];
    // A X
    if (rock.includes(opp) && rock.includes(me)) {
      totalScore += 4
    }
    // A Y
    if (rock.includes(opp) && paper.includes(me)) {
      totalScore += 8;
    }
    // A Z
    if (rock.includes(opp) && scissor.includes(me)) {
      totalScore += 3;
    }
    // B X
    if (paper.includes(opp) && rock.includes(me)) {
      totalScore += 1;
    }
    // B Y
    if (paper.includes(opp) && paper.includes(me)) {
      totalScore += 5;
    }
    // B Z
    if (paper.includes(opp) && scissor.includes(me)) {
      totalScore += 9;
    }
    // C X
    if (scissor.includes(opp) && rock.includes(me)) {
      totalScore += 7;
    }
    // C Y
    if (scissor.includes(opp) && paper.includes(me)) {
      totalScore += 2;
    }
    // C Z
    if (scissor.includes(opp) && scissor.includes(me)) {
      totalScore += 6;
    }
    console.log(totalScore)
  })
  console.log(totalScore)
} catch (err) {
  console.error(err);
}
