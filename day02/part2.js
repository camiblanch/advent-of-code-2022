const {readFile} = require("../utils.js");

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);
	const strategyGuide = rawData.map(strat => {
		const [theirMove, myStrategy] = strat.split(" ");
		return {theirMove, myStrategy};
	});
	const score = play(strategyGuide);
	console.log(score);
};

const play = (moves) => {
	const rock = "rock";
	const paper = "paper";
	const scissors = "scissors";
	const strategies = {
		lose: "X",
		draw: "Y",
		win: "Z",
	};

	const moveInfo = {
		A: {move: rock, score: 1},
		B: {move: paper, score: 2},
		C: {move: scissors, score: 3},
	};
	const movePoints = {};
	movePoints[rock] = 1;
	movePoints[paper] = 2;
	movePoints[scissors] = 3;

	let totalScore = 0;

	moves.forEach(move => {
		const theirMove = moveInfo[move.theirMove];
		const myStrategy = move.myStrategy;

		if (myStrategy === strategies.draw) {
			totalScore += 3 + theirMove.score;
		} else if (myStrategy === strategies.win) {
			if (theirMove.move === rock) {
				totalScore += movePoints.paper;
			} else if (theirMove.move === paper) {
				totalScore += movePoints.scissors;
			} else if (theirMove.move === scissors) {
				totalScore += movePoints.rock;
			}
			totalScore += 6;
		} else if (myStrategy === strategies.lose) {
			if (theirMove.move === rock) {
				totalScore += movePoints.scissors;
			} else if (theirMove.move === paper) {
				totalScore += movePoints.rock;
			} else if (theirMove.move === scissors) {
				totalScore += movePoints.paper;
			}
		}
	});

	return totalScore;
};

part2();