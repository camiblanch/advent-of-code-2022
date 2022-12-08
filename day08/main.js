const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const rows = rawData.length;
	const forest = rawData.map(line => line.split("").map(stringNum => parseInt(stringNum)));
	const cols = forest[0].length;

	const isTreeVisible = (tree, col, row) => {
		return !!(
			isTreeVisibleOnLeft(tree, col, row) ||
			isTreeVisibleOnRight(tree, col, row) ||
			isTreeVisibleOnTop(tree, col, row) ||
			isTreeVisibleOnBottom(tree, col, row)
		);
	};

	const isTreeVisibleOnLeft = (tree, col, row) => {
		for (let x = 0; x < col; x++) {
			if (forest[row][x] >= tree) {
				return false;
			}
		}
		return true;
	};

	const isTreeVisibleOnRight = (tree, col, row) => {
		for (let x = col + 1; x < cols; x++) {
			if (forest[row][x] >= tree) {
				return false;
			}
		}
		return true;
	};

	const isTreeVisibleOnTop = (tree, col, row) => {
		for (let y = 0; y < row; y++) {
			if (forest[y][col] >= tree) {
				return false;
			}
		}
		return true;
	};

	const isTreeVisibleOnBottom = (tree, col, row) => {
		for (let y = row + 1; y < rows; y++) {
			if (forest[y][col] >= tree) {
				return false;
			}
		}
		return true;
	};

	let treesVisible = 0;
	forest.forEach((row, rowIndex) => {
		row.forEach((tree, colIndex) => {
			if (isTreeVisible(tree, colIndex, rowIndex)) {
				treesVisible++;
			}
		});
	});

	console.log(treesVisible);
};

main();