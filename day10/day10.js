const fs = require('fs');

try {
    const signals = fs.readFileSync('/Users/vigneshvelu/Desktop/adventOfCode/day10/day_10_input.txt', 'utf8').split('\n').slice(0);
    let signalStrength = getSignalMap(signals);
    console.log('Answer 1: ', signalStrength);
    console.log('Answer 2:');
    renderPixels(signals);
}
catch (e) {
    console.log(e);
}

function getSignalMap(signals) {
    let X = 1;
    let cycle = 0;
    let signalMap = new Map();
    const stops = [20, 60, 100, 140, 180, 220];
    let signalStrength = 0;
    for (let i = 0; i < signals.length; i++) {
        const signal = signals[i].split(' ');
        if (signal[0] === 'addx') {
            cycle += 1;
            signalMap.set(cycle, X);
            cycle += 1;
            signalMap.set(cycle, X);
            X += Number(signal[1])
        }
        if (signal[0] === 'noop') {
            cycle += 1;
            signalMap.set(cycle, X);
        }
    }
    
    signalStrength = stops.reduce(
        (accumulator, currentValue) => accumulator + (signalMap.get(currentValue) * currentValue),
        0);

    return signalStrength;
}

function renderPixels(instructions) {
    const screen = []
    let cycles = 0
    let x = 1
    for (let i = 0; i < instructions.length; ++i) {
        if (!cycles) {
            screen.push([])
        }
        screen[screen.length - 1].push(cycles + 1 === x || cycles === x || cycles - 1 === x)
        cycles = (cycles + 1) % 40

        const [type, value] = instructions[i].split(' ')
        if (type === 'addx') {
            if (!cycles)
                screen.push([])
            screen[screen.length - 1].push(cycles + 1 === x || cycles === x || cycles - 1 === x)
            cycles = (cycles + 1) % 40
            x += parseInt(value)
        }
    }
    console.log(screen.map(row => row.map(bool => bool ? '#' : '.').join('')).join('\n'))
}