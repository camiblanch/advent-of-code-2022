const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	// 20 60 100 140 180 220
	// sum signal strengths at those numOfCycles

	const cyclesToCheck = [20, 60, 100, 140, 180, 220];
	let numOfCycles = 0;
	let x = 1;
	let signalStrength = 0;

	const increaseCycles = () => {
		numOfCycles++;
		const cyclesToCheckIndex = cyclesToCheck.indexOf(numOfCycles);
		if (cyclesToCheckIndex >= 0) {
			signalStrength += x * cyclesToCheck[cyclesToCheckIndex];
		}
	};

	rawData.forEach(instruction => {
		increaseCycles();
		if (instruction.startsWith("addx")) {
			increaseCycles();
			const instructionParts = instruction.split(" ");
			const number = parseInt(instructionParts[1]);
			x += number;
		}
	});

	console.log(signalStrength);
};

main();