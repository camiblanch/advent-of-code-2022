const {readFile} = require("../utils.js");

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	let numOfCycles = 0;
	let x = 1;
	const darkPixel = ".";
	const litPixel = "#";
	const cols = 40;
	const rows = 6;

	const crt = [];
	for (let i = 0; i < cols; i++) {
		const row = [];
		for (let j = 0; j < rows; j++) {
			row.push(darkPixel);
		}
		crt.push(row);
	}

	const getCurrRow = () => {
		return Math.floor(numOfCycles / 40);
	};

	const getCurrCol = () => {
		let currCol = numOfCycles;
		while (currCol > cols) {
			currCol -= cols;
		}
		return currCol;
	};

	const increaseCycles = () => {
		const currRow = getCurrRow();
		const currCol = getCurrCol();

		if (x - 1 === currCol || x === currCol || x + 1 === currCol) {
			crt[currCol][currRow] = litPixel;
		}

		numOfCycles++;
	};

	const printCrt = () => {
		for (let row = 0; row < rows; row++) {
			let stringRow = "";
			for (let col = 0; col < cols; col++) {
				stringRow += crt[col][row];
			}
			console.log(stringRow);
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

	printCrt();
};

part2();