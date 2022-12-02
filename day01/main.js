const {readFile} = require("../utils.js");

const part1 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const elfCalories = [];
	let calorieTotal = 0;
	let mostCalories = 0;
	rawData.forEach(calories => {
		if (calories === "") {
			elfCalories.push(calorieTotal);
			if (calorieTotal > mostCalories) {
				mostCalories = calorieTotal;
			}
			calorieTotal = 0;
		} else {
			calorieTotal += parseInt(calories);
		}
	});
	console.log(mostCalories);
	elfCalories.sort((a, b) => {
		return a - b;
	});
	const topThree = elfCalories.slice(-3);
	console.log(topThree);

	let sum = 0;
	topThree.forEach(topCalorie => {
		sum += topCalorie;
	});

	console.log("Total of top 3: ", sum);
};

part1();