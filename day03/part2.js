const {readFile} = require("../utils.js");

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);
	const badges = [];
	for (let i = 0; i < rawData.length;) {
		const elf1 = rawData[i++].split("");
		const elf2 = rawData[i++].split("");
		const elf3 = rawData[i++].split("");

		const badge = elf1.find(item => {
			return elf2.includes(item) && elf3.includes(item);
		});
		badges.push(badge);
	}

	const alphabetArr = Array.from("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
	let total = 0;
	badges.forEach(sharedItem => {
		total += alphabetArr.indexOf(sharedItem) + 1;
	});

	console.log(total);
};

part2();