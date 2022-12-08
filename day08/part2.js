const {readFile} = require("../utils.js");

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const rows = rawData.length;
	const forest = rawData.map(line => line.split("").map(stringNum => parseInt(stringNum)));
	const cols = forest[0].length;

	const scoreToLeft = (tree, col, row) => {
		let score = 0;
		for (let x = col - 1; x >= 0; x--) {
			score++;
			const currTree = forest[row][x];
			if (currTree >= tree) {
				break;
			}
		}
		return score;
	};

	const scoreToRight = (tree, col, row) => {
		let score = 0;
		for (let x = col + 1; x < cols; x++) {
			score++;
			const currTree = forest[row][x];
			if (currTree >= tree) {
				break;
			}
		}
		return score;
	};

	const scoreToTop = (tree, col, row) => {
		let score = 0;
		for (let y = row - 1; y >= 0; y--) {
			score++;
			const currTree = forest[y][col];
			if (currTree >= tree) {
				break;
			}
		}
		return score;
	};

	const scoreToBottom = (tree, col, row) => {
		let score = 0;
		for (let y = row + 1; y < rows; y++) {
			score++;

			const currTree = forest[y][col];
			if (currTree >= tree) {
				break;
			}
		}
		return score;
	};

	const getScenicScore = (tree, col, row) => {
		const leftScore = scoreToLeft(tree, col, row);
		const rightScore = scoreToRight(tree, col, row);
		const topScore = scoreToTop(tree, col, row);
		const bottomScore = scoreToBottom(tree, col, row);
		return leftScore * rightScore * topScore * bottomScore;
	};

	let highestScenicScore = 0;
	let locationOfHighest = {col: 0, row: 0};
	forest.forEach((row, rowIndex) => {
		row.forEach((tree, colIndex) => {
			if (!(rowIndex === 0 || colIndex === 0 || rowIndex + 1 === rows || colIndex + 1 === cols)) {
				const scenicScore = getScenicScore(tree, colIndex, rowIndex);
				if (scenicScore > highestScenicScore) {
					highestScenicScore = scenicScore;
					locationOfHighest.col = colIndex;
					locationOfHighest.row = rowIndex;
				}
			}
		});
	});

	console.log(locationOfHighest);
	console.log(highestScenicScore);
};

part2();