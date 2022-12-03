const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);
	const sharedItems = rawData.map(rucksackData => {
		const half = rucksackData.length / 2;
		const compartment1 = rucksackData.slice(0, half).split("");
		const compartment2 = rucksackData.slice(half).split("");

		return compartment1.find(compartment1Item => {
			return compartment2.includes(compartment1Item);
		});
	});

	const alphabetArr = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
	let total = 0;
	sharedItems.forEach(sharedItem => {
		total += alphabetArr.indexOf(sharedItem) + 1;
	});

	console.log(total);
};

main();