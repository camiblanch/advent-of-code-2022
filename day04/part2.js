const {readFile} = require("../utils.js");

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	let pairsWithAnyOverlap = 0;

	rawData.forEach(pair => {
		const [elf1, elf2] = pair.split(",");
		const [elf1Start, elf1End] = elf1.split("-");
		const [elf2Start, elf2End] = elf2.split("-");

		const elf1Range = createRange(elf1Start, elf1End);
		const elf2Range = createRange(elf2Start, elf2End);

		for (const elf1Section of elf1Range) {
			if (elf2Range.includes(elf1Section)) {
				pairsWithAnyOverlap++;
				break;
			}
		}
	});

	console.log("Fully contains: ", pairsWithAnyOverlap);
};

const createRange = (start, end) => {
	const startInt = parseInt(start);
	const endInt = parseInt(end);
	let range = [];
	for (let i = startInt; i <= endInt; i++) {
		range.push(i);
	}
	return range;
};

part2();