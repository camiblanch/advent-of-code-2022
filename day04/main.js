const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	let pairsWithFullyContains = 0;

	rawData.forEach(pair => {
		const [elf1, elf2] = pair.split(",");
		const [elf1Start, elf1End] = elf1.split("-");
		const [elf2Start, elf2End] = elf2.split("-");

		const elf1Range = createRange(elf1Start, elf1End);
		const elf2Range = createRange(elf2Start, elf2End);

		if (elf1Range.includes(elf2Range) || elf2Range.includes(elf1Range)) {
			pairsWithFullyContains++;
		}
	});

	console.log("Fully contains: ", pairsWithFullyContains);
};

const createRange = (start, end) => {
	const startInt = parseInt(start);
	const endInt = parseInt(end);
	let range = "-";
	for (let i = startInt; i <= endInt; i++) {
		range += i + "-";
	}
	return range;
};

main();