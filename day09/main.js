const {readFile} = require("../utils.js");

class Position {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	moveUp = () => {
		this.y = this.y + 1;
	};

	moveDown = () => {
		this.y = this.y - 1;
	};

	moveRight = () => {
		this.x = this.x + 1;
	};

	moveLeft = () => {
		this.x = this.x - 1;
	};
}

class Rope {
	constructor() {
		this.head = new Position();
		this.tail = new Position();
	}

	headAndTailAreCloseEnough = () => {
		return this.head.y === this.tail.y && Math.abs(this.head.x - this.tail.x) === 1 || this.head.x === this.tail.x && Math.abs(this.head.y - this.tail.y) === 1 || this.head.y - this.tail.y === this.head.x - this.tail.x || this.head.y - this.tail.y === this.tail.x - this.head.x;
	};

	getCopyOfLastHeadPosition = () => {
		return new Position(this.head.x, this.head.y);
	};

	moveUp = () => {
		const lastHeadPosition = this.getCopyOfLastHeadPosition();
		this.head.moveUp();
		if (!this.headAndTailAreCloseEnough()) {
			this.tail.x = lastHeadPosition.x;
			this.tail.y = lastHeadPosition.y;
		}
	};

	moveDown = () => {
		const lastHeadPosition = this.getCopyOfLastHeadPosition();
		this.head.moveDown();
		if (!this.headAndTailAreCloseEnough()) {
			this.tail.x = lastHeadPosition.x;
			this.tail.y = lastHeadPosition.y;
		}
	};

	moveRight = () => {
		const lastHeadPosition = this.getCopyOfLastHeadPosition();
		this.head.moveRight();
		if (!this.headAndTailAreCloseEnough()) {
			this.tail.x = lastHeadPosition.x;
			this.tail.y = lastHeadPosition.y;
		}
	};

	moveLeft = () => {
		const lastHeadPosition = this.getCopyOfLastHeadPosition();
		this.head.moveLeft();
		if (!this.headAndTailAreCloseEnough()) {
			this.tail.x = lastHeadPosition.x;
			this.tail.y = lastHeadPosition.y;
		}
	};

	getTailPosition = () => {
		return `${this.tail.x},${this.tail.y}`;
	};
}

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const tailVisitedCoords = new Set(); // store strings of coords, "x,y"
	const rope = new Rope();
	rawData.forEach(line => {
		const [direction, stepsAsString] = line.split(" ");
		const steps = parseInt(stepsAsString);

		for (let i = 0; i < steps; i++) {
			if (direction === "R") {
				rope.moveRight();
			} else if (direction === "L") {
				rope.moveLeft();
			} else if (direction === "U") {
				rope.moveUp();
			} else if (direction === "D") {
				rope.moveDown();
			}
			tailVisitedCoords.add(rope.getTailPosition());
		}
	});

	console.log(tailVisitedCoords);
	console.log(tailVisitedCoords.size);
};

main();