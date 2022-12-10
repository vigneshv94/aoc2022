const fs = require('fs');
const visited = new Set();

try {
    const commands = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day9/day_9_input.txt', 'utf8').split('\n').slice(0);
    console.log(commands);
    const knotCount = 10;// 2;
    const knotList = [];

    for(let i = 0; i < knotCount; i++) {
        knotList.push({x: 0, y: 0});
    }

    head = knotList[0];
    for(let i = 0; i < commands.length; i++) {
        let [directions, numberOfSteps] = commands[i].split(' ');
        for(let j = 0; j < numberOfSteps; j++) {

            if(directions === 'R') {
                head.x++;
                moveTail(knotList);
            }

            if(directions === 'U') {
                head.y++;
                moveTail(knotList);
            }

            if(directions === 'L') {
                head.x--;
                moveTail(knotList);
            }

            if(directions === 'D') {
                head.y--;
                moveTail(knotList);
            }
        }
    }
    console.log(visited)
    console.log(visited.size+1);

} catch(error) {
    console.log(error);
}

function moveTail(knotList) {
    for(let i = 1; i< knotList.length; i++) {
        let h = knotList[i-1];
        let t = knotList[i];

        if(!(Math.abs(h.x - t.x) <= 1 && Math.abs(h.y - t.y) <=1)) {
            
            if (h.x > t.x) { t.x +=1; }

            if (h.x < t.x) { t.x -=1; }

            if (h.y > t.y) { t.y +=1; }

            if (h.y < t.y) { t.y -=1; }

            if (i === knotList.length -1) { visited.add(`${t.x}_${t.y}`); }
        }
    }
}