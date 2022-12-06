const fs = require('fs');

try {
  const cargoManifesto = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day5/day_5_input.txt', 'utf8').split('\n').slice(0);
  let cargoStackInfo = buildStack(cargoManifesto);
  let cargoStack = Object.assign({}, cargoStackInfo.cargoStack);

  for(const cargo in cargoStack) {
    cargoStack[cargo].reverse();
  }

  console.log(cargoStack)
  for(let i= cargoStackInfo.lastIndex+2; i < cargoManifesto.length; i++) {
    let instruction = getInstruction(cargoManifesto[i]);
    const movable = cargoStack[instruction.source].slice(-instruction.move);
    cargoStack[instruction.destination] = [...cargoStack[instruction.destination], ...movable]
    for(let numberOfMoves = 0; numberOfMoves < instruction.move; numberOfMoves++) {
      if(cargoStack[instruction.source]) {
        cargoStack[instruction.source].pop();
      }
    }
  }
  let result = '';
  console.log(cargoStack);
  for(const cargo in cargoStack) {
    result += cargoStack[cargo][cargoStack[cargo].length-1];
  }
  console.log(result)
} catch (err) {
  console.error(err);
}

function buildStack(cargoManifesto) {
  let cargoStack = {};
  let lastIndex;
  for(let index = 0; index < cargoManifesto.length+1; index++) {
    let cargo = cargoManifesto[index];
    cargoStackIndex = 1;

    if(cargo.charAt(0) != '[' && index!=0) {
      lastIndex = index;
      return { cargoStack, lastIndex }
    }

    for(let i=0; i < cargo.length; i++) {
      const character = cargo.charAt(i+1);

      if (!(typeof cargoStack[cargoStackIndex] === 'object')) {
        cargoStack[cargoStackIndex] = [];
      } 
      if (character != ' ') {
        cargoStack[cargoStackIndex].push(character);
      }
        cargoStackIndex += 1;
      i += 3;
    }
  };
  return {cargoStack, lastIndex};
}

function getInstruction(cargoInstruction) {
  let instruction = cargoInstruction.replace(/[a-zA-Z]/g,'').split(" ")
  .filter(s => {
    if(s !== "") return s
  });

  return {
    move: Number(instruction[0]),
    source: Number(instruction[1]),
    destination: Number(instruction[2])
  };
}
