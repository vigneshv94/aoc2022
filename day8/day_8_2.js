const fs = require('fs');
let topCount = 0;
let bottomCount = 0;
let leftCount = 0;
let rightCount = 0;
try {
  const trees = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day8/day_8_input.txt', 'utf8').split('\n').slice(0);
  const arrangements = [];

  trees.forEach(tree => {
    const split = tree.split('');
    arrangements.push(split);
  })

  let visibleTrees = 0;
  
  visibleTrees += visibleTreesInside(arrangements);
  console.log('Trees on Edges', visibleTrees);
} catch (err) {
  console.error(err);
}

function visibleTreesInside(arrangements) {
    let count = 0;
    const edgeIndex = [0, arrangements.length - 1, arrangements[0].length-1];
    console.log(arrangements)
    let maxValue = 0;
    arrangements.forEach((trees, outerIndex) =>{
        if (!edgeIndex.includes(outerIndex)) {
            trees.forEach((tree, internalIndex) => {
                if(!edgeIndex.includes(internalIndex)) {
                    topCount = 0;
                    bottomCount = 0;
                    leftCount = 0;
                    rightCount = 0;

                    isVisibleFromEdgesTop(internalIndex, outerIndex-1, arrangements, tree);
                    console.log('top', topCount);

                    isVisibleFromEdgesBottom(internalIndex, outerIndex+1, arrangements, tree);
                    console.log('bottom', bottomCount);

                    isVisibleFromEdgesLeft(internalIndex-1, outerIndex, arrangements, tree);
                    console.log('left', leftCount);

                    isVisibleFromEdgesRight(internalIndex+1, outerIndex, arrangements, tree);
                    console.log('right', rightCount);

                    const product = (topCount ? topCount : 1) * (bottomCount ? bottomCount : 1) * (leftCount ? leftCount : 1) * (rightCount ? rightCount : 1);
                    console.log(product, maxValue < product)
                    maxValue = product > maxValue ? product : maxValue;

                }
            })
        }
    });
    console.log('internal', maxValue);
    return maxValue;
}

function isVisibleFromEdgesLeft(internalIndex, outerIndex, arrangements, tree) {
    if (internalIndex < 0) {
        return 1
    }
    const left = arrangements[outerIndex][internalIndex];
    if(left < tree) {
        leftCount++;
        return isVisibleFromEdgesLeft(internalIndex-1, outerIndex, arrangements, tree);
    } else {
        leftCount++;
        return 0;
    }
}

function isVisibleFromEdgesTop(internalIndex, outerIndex, arrangements, tree) {
    if (outerIndex < 0) {
        return 1
    }
    const top = arrangements[outerIndex][internalIndex];
    if(top < tree) {
        topCount++;
        return isVisibleFromEdgesTop(internalIndex, outerIndex-1, arrangements, tree);
    } else {
        topCount++;
        return 0;
    }
}

function isVisibleFromEdgesRight(internalIndex, outerIndex, arrangements, tree) {
    if (internalIndex > arrangements.length - 1) {
        return 1
    }
    const left = arrangements[outerIndex][internalIndex];
    if(left < tree) {
        rightCount++;
        return isVisibleFromEdgesRight(internalIndex+1, outerIndex, arrangements, tree);
    } else {
        rightCount++;
        return 0;
    }
}

function isVisibleFromEdgesBottom(internalIndex, outerIndex, arrangements, tree) {
    if (outerIndex > arrangements.length - 1) {
        return 1
    }
    const bottom = arrangements[outerIndex][internalIndex];
    if(bottom < tree) {
        bottomCount++;
        return isVisibleFromEdgesBottom(internalIndex, outerIndex+1, arrangements, tree);
    } else {
        bottomCount++;
        return 0;
    }
}