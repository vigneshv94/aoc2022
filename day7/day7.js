const fs = require('fs');
const ROOT = '.';

try {
  const commands = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day7/day_7_input.txt', 'utf8').split('\n').slice(0);
  const dirs = getDirectorySizes(commands);
  console.log(dirs)
  const answer1 = getSumOfTotalSizes(dirs);
  const answer2 = getSmallestDirToDelete(dirs);

  console.log(answer1, answer2);
} catch (err) {
  console.error(err);
}


function getType(line) {
  if (line.startsWith('$')) return 'command';
  if (line.startsWith('dir')) return 'directory';
  return 'file';
}

function getDirectorySizes(lines) {
  const dirs = new Map();
  let currentDirectory = [ROOT];

  for (let line of lines) {
    if (getType(line) === 'command') {
      let [, command, arg] = line.split(' ');

      if (command === 'cd') {
        if (arg === '/') {
          currentDirectory.splice(1);
        } else if (arg === '..') {
          currentDirectory.pop();
        } else {
          currentDirectory.push(arg);
        }
      }
    }

    if (getType(line) === 'file') {
      const [size] = line.split(' ');
      const key = currentDirectory.join('/');

      dirs.set(key, (dirs.get(key) || 0) + Number(size));

      if (currentDirectory.length > 1) {
        for (let i = currentDirectory.length - 1; i > 0; i--) {
          const parentKey = currentDirectory.slice(0, i).join('/');

          dirs.set(parentKey, (dirs.get(parentKey) || 0) + Number(size));
        }
      }
    }
  }

  return dirs;
}

function getSumOfTotalSizes(dirs) {
  const MAX_DIR_SIZE = 100_000;
  let total = 0;

  for (let size of dirs.values()) {
    if (size <= MAX_DIR_SIZE) {
      total += size;
    }
  }

  return total;
}

function getSmallestDirToDelete(dirs) {
  const TOTAL_DISKSPACE = 70_000_000;
  const UNUSED_SPACE = 30_000_000;
  const usedSpace = dirs.get(ROOT);
  const minRequired = UNUSED_SPACE - (TOTAL_DISKSPACE - usedSpace);
  let smallest = Infinity;

  for (let size of dirs.values()) {
    if (size >= minRequired && size < smallest) {
      smallest = size;
    }
  }

  return smallest;
}