const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const splitIndex = rawData.findIndex(data => data === "");
	const rawStacks = rawData.slice(0, splitIndex);
	const rawNumStacks = rawStacks.pop().match(/[0-9]+/g);
	const numStacks = parseInt(rawNumStacks.pop());
	const rawInstructions = rawData.slice(splitIndex + 1);

	const stacks = [];
	for (let i = 0; i < numStacks; i++) {
		stacks.push([]);
	}

	rawStacks.reverse().forEach(stackRow => {
		const rawRow = stackRow.match(/(\[[A-Z]\])|(\s){1,4}/g).filter(rawItem => rawItem !== " ");
		rawRow.forEach((rawItem, col) => {
			const item = rawItem.replace(/[\[\]']+/g, "");
			if (item.match(/[A-Z]/g)) {
				stacks[col].push(item);
			}
		});
	});

	rawInstructions.forEach(rawInstruction => {
		const parsedInstructions = rawInstruction.match(/[0-9]+/g);
		const numberOfCrates = parseInt(parsedInstructions[0]);
		const startingCol = parseInt(parsedInstructions[1]);
		const endingCol = parseInt(parsedInstructions[2]);

		const crates = [];
		for (let i = 0; i < numberOfCrates; i++) {
			const crate = stacks[startingCol - 1].pop();
			crates.push(crate);
		}
		crates.reverse();
		const endingColContents = stacks[endingCol -1];
		stacks[endingCol - 1] = [...endingColContents, ...crates];
	});

	let topOfStacks = "";
	stacks.forEach(stack => {
		topOfStacks += stack[stack.length-1];
	});
	console.log(topOfStacks);
};

main();