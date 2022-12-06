const {readFile} = require("../utils.js");

const main = (numUnique = 4) => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName)[0].split("");

	let uniqueCharacters = [];
	for (let i = 0; i < rawData.length; i++) {
		const ch = rawData[i];

		const indexOfSameChar = uniqueCharacters.indexOf(ch);
		uniqueCharacters.push(ch);
		if (indexOfSameChar >= 0) {
			uniqueCharacters = uniqueCharacters.slice(indexOfSameChar + 1);
		} else {
			if (uniqueCharacters.length === numUnique) {
				console.log(i + 1);
				break;
			}
		}
	}

	console.log(uniqueCharacters);
};

// main();
main(14);