const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName)[0].split("");

	let uniqueFour = [];
	for (let i = 0; i < rawData.length; i++) {
		const ch = rawData[i];

		const indexOfSameChar = uniqueFour.indexOf(ch);
		uniqueFour.push(ch);
		if (indexOfSameChar >= 0) {
			uniqueFour = uniqueFour.slice(indexOfSameChar + 1);
		} else {
			if (uniqueFour.length === 4) {
				console.log(i + 1);
				break;
			}
		}
	}

	console.log(uniqueFour);
};

main();