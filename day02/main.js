const {readFile} = require("../utils.js");

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);
	const strategyGuide = rawData.map(strat => {
		const [theirMove, myMove] = strat.split(" ");
		return {theirMove, myMove};
	});
	const score = play(strategyGuide);
	console.log(score);
};

const play = (moves) => {
	const rock = "rock";
	const paper = "paper";
	const scissors = "scissors";

	const didPlayerAWin = (playerAMove, playerBMove) => {
		return (playerAMove === rock && playerBMove === scissors) || (playerAMove === paper && playerBMove === rock) || (playerAMove === scissors && playerBMove === paper);
	};

	const theirMoves = {
		A: rock,
		B: paper,
		C: scissors,
	};
	const myMoves = {
		X: {move: rock, score: 1},
		Y: {move: paper, score: 2},
		Z: {move: scissors, score: 3},
	};

	let totalScore = 0;

	moves.forEach(move => {
		const theirMove = theirMoves[move.theirMove];
		const {move: myMove, score: myScore} = myMoves[move.myMove];

		totalScore += myScore;

		if (theirMove === myMove) { // draw
			totalScore += 3;
		}

		if (didPlayerAWin(myMove, theirMove)) {
			totalScore += 6;
		}
	});

	return totalScore;
};

main();