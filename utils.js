const readFile = (file = "input.txt") => {
	const fs = require("fs");
	return fs.readFileSync(file).toString().split("\n");
};

module.exports = {readFile}