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
	constructor(index) {
		this.position = new Position();
		this.index = index;
		this.tail;
	}

	headAndTailAreCloseEnough = () => {
		const distanceBetweenHeadAndTail = () => {
			return Math.sqrt(Math.pow(this.position.x - this.tail.position.x, 2) + Math.pow(this.position.y - this.tail.position.y, 2));
		};

		if (!this.tail) {
			return true;
		}

		const distanceBetween = distanceBetweenHeadAndTail();
		return !!(distanceBetween === 1 || distanceBetween === Math.sqrt(2) || distanceBetween === 0);
	};

	realignX = () => {
		if (this.position.x > this.tail.position.x) {
			this.tail.position.moveRight();
		} else if (this.position.x < this.tail.position.x) {
			this.tail.position.moveLeft();
		}
	};

	realignY = () => {
		if (this.position.y > this.tail.position.y) {
			this.tail.position.moveUp();
		} else if (this.position.y < this.tail.position.y) {
			this.tail.position.moveDown();
		}
	};

	moveUp = () => {
		this.position.moveUp();
		this.repositionTail();
	};

	moveDown = () => {
		this.position.moveDown();
		this.repositionTail();
	};

	moveRight = () => {
		this.position.moveRight();
		this.repositionTail();
	};

	moveLeft = () => {
		this.position.moveLeft();
		this.repositionTail();
	};

	repositionTail() {
		if (!this.headAndTailAreCloseEnough()) {
			const head = {x: this.position.x, y: this.position.y};
			const tail = {x: this.tail.position.x, y: this.tail.position.y};
			if (head.x === tail.x) {
				this.tail.position.y = (head.y + tail.y) / 2;
			} else if (head.y === tail.y) {
				this.tail.position.x = (head.x + tail.x) / 2;
			} else {
				// move diagonal
				if (Math.abs(head.x - tail.x) === 1) {
					this.tail.position.x = head.x;
					this.tail.position.y = (head.y + tail.y) / 2;
				} else if (Math.abs(head.y - tail.y) === 1) {
					this.tail.position.x = (head.x + tail.x) / 2;
					this.tail.position.y = head.y;
				} else {
					this.tail.position.x = (head.x + tail.x) / 2;
					this.tail.position.y = (head.y + tail.y) / 2;
				}
			}

			this.tail.repositionTail();
		}
	}

	getTailPosition = () => {
		if (this.tail) {
			return this.tail.getTailPosition();
		} else {
			return `${this.position.x},${this.position.y}`;
		}
	};
}

const arrayRope = [];

const printArrayRope = () => {
	const grid = [];
	for (let i = 0; i < 21; i++) {
		const row = [];
		for (let j = 0; j < 26; j++) {
			row.push(".");
		}
		grid.push(row);
	}

	console.log("///////////");
	const copyRope = [...arrayRope].reverse();
	copyRope.forEach(({position, index}) => {
		grid[position.y + 5][position.x + 11] = index;
	});

	grid.reverse();
	grid.forEach(row => {
		console.log(row.join(""));
	});
	console.log("///////////");
};

const buildRope = (rope, index, numTailsToAdd) => {
	arrayRope.push(rope);
	if (numTailsToAdd > 0) {
		const tail = new Rope(index);
		rope.tail = tail;
		buildRope(tail, index + 1, numTailsToAdd - 1);
	}
};

const part2 = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const tailVisitedCoords = new Set(); // store strings of coords, "x,y"
	const rope = new Rope("H");
	buildRope(rope, 1, 9);

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
		// printArrayRope();
	});

	console.log(tailVisitedCoords.size);
};

part2();