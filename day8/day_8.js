const fs = require('fs');

try {
  const trees = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day8/day_8_input.txt', 'utf8').split('\n').slice(0);
  const arrangements = [];

  trees.forEach(tree => {
    const split = tree.split('');
    arrangements.push(split);
  })

  let visibleTrees = 0;

  visibleTrees += visibleTreesInEdges(arrangements);  
  
  visibleTrees += visibleTreesInside(arrangements);
  console.log('Trees on Edges', visibleTrees);
} catch (err) {
  console.error(err);
}

function visibleTreesInEdges(arrangements) {
    return ( 2 * (arrangements.length)) + (2 * (arrangements[0].length - 2));
}

function visibleTreesInside(arrangements) {
    let count = 0;
    const edgeIndex = [0, arrangements.length - 1, arrangements[0].length-1];
    console.log(arrangements)
    arrangements.forEach((trees, outerIndex) =>{
        if (!edgeIndex.includes(outerIndex)) {
            trees.forEach((tree, internalIndex) => {
                if(!edgeIndex.includes(internalIndex)) {
                    const top = isVisibleFromEdgesTop(internalIndex, outerIndex-1, arrangements, tree);
                    //arrangements[outerIndex-1][internalIndex];
                    // console.log('top', top);
                    const bottom = isVisibleFromEdgesBottom(internalIndex, outerIndex+1, arrangements, tree);
                    //arrangements[outerIndex+1][internalIndex];
                    // console.log('bottom', bottom);
                    const left = isVisibleFromEdgesLeft(internalIndex-1, outerIndex, arrangements, tree);
                    //arrangements[outerIndex][internalIndex - 1];
                    console.log('left', left);
                    const right = isVisibleFromEdgesRight(internalIndex+1, outerIndex, arrangements, tree);
                    //arrangements[outerIndex][internalIndex + 1]
                    // console.log('right', right);
                    // console.log(tree);
                    if (left || right || top || bottom) {
                        count += 1;
                    }
                }
            })
        }
    });
    console.log('internal', count);
    return count;
}

function isVisibleFromEdgesLeft(internalIndex, outerIndex, arrangements, tree) {
    if (internalIndex < 0) {
        return true
    }
    const left = arrangements[outerIndex][internalIndex];
    if(left < tree) {
        return isVisibleFromEdgesLeft(internalIndex-1, outerIndex, arrangements, tree);
    } else {
        return false;
    }
}

function isVisibleFromEdgesTop(internalIndex, outerIndex, arrangements, tree) {
    if (outerIndex < 0) {
        return true
    }
    const top = arrangements[outerIndex][internalIndex];
    if(top < tree) {
        return isVisibleFromEdgesTop(internalIndex, outerIndex-1, arrangements, tree);
    } else {
        return false;
    }
}

function isVisibleFromEdgesRight(internalIndex, outerIndex, arrangements, tree) {
    if (internalIndex > arrangements.length - 1) {
        return true
    }
    const left = arrangements[outerIndex][internalIndex];
    if(left < tree) {
        return isVisibleFromEdgesRight(internalIndex+1, outerIndex, arrangements, tree);
    } else {
        return false;
    }
}

function isVisibleFromEdgesBottom(internalIndex, outerIndex, arrangements, tree) {
    if (outerIndex > arrangements.length - 1) {
        return 1
    }
    const top = arrangements[outerIndex][internalIndex];
    if(top < tree) {
        return isVisibleFromEdgesBottom(internalIndex, outerIndex+1, arrangements, tree);
    } else {
        return 0;
    }
}