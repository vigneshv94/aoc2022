const fs = require('fs');

try {
  const signal = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day6/day_6_input.txt', 'utf8');
  const marker = [];
  for(let i = 0; i < signal.length; i++) {
    console.log(signal.charAt(i));
    marker.push(signal.charAt(i));
    // if (marker.length === 14) { // Part 1
    if (marker.length === 14) { // Part 2
        console.log(marker);
        if(!checkIfAllSignsAreUnique(marker)) {
            console.log(i+1);
            return
        }
        marker.shift();
    }

  }
  console.log(signal)
} catch (err) {
  console.error(err);
}

function checkIfAllSignsAreUnique(markers) {
    const isUnique = markers.some(function(v,i,a){
        return a.lastIndexOf(v)!=i;
    });
    return isUnique;
}