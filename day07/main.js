const {readFile} = require("../utils.js");

class Directory {
	constructor(dirName, parentDir) {
		this.dirName = dirName;
		this.subDirs = [];
		this.files = [];
		this.parentDir = parentDir;
		this.dirSize = 0;
	}

	addFile = (file) => {
		this.files.push(file);
		this.addToDirSize(file.size);
	}

	addToDirSize = (moreSize) => {
		this.dirSize += moreSize;
		if (this.parentDir) {
			this.parentDir.addToDirSize(moreSize);
		}
	}
}

class File {
	constructor(size, name) {
		this.size = size;
		this.name = name;
	}
}

const startsWithNumber = (s) => {
	return /^\d/.test(s);
};

const checkForSmallDirectorySize = (directory, smallDirectories) => {
	if (directory.dirSize <= 100000) {
		smallDirectories.push(directory.dirSize);
	}
	directory.subDirs.forEach(subDir => {
		checkForSmallDirectorySize(subDir, smallDirectories);
	});
};

const main = () => {
	const fileName = "./input.txt";
	const rawData = readFile(fileName);

	const fileSystem = new Directory("/");
	let currDir = fileSystem;
	// skip first 2 lines since we already know where we are starting
	for (let i = 2; i < rawData.length; i++) {
		const line = rawData[i];
		if (line.startsWith("dir ")) {
			const dirName = line.substring(4);
			currDir.subDirs.push(new Directory(dirName, currDir));
		} else if (startsWithNumber(line)) {
			const [fileSize, fileName] = line.split(" ");
			currDir.addFile(new File(parseInt(fileSize), fileName));
		} else if (line.startsWith("$ cd")) {
			const dirToGoTo = line.substring(5);
			if (dirToGoTo === "..") {
				currDir = currDir.parentDir;
			} else if (dirToGoTo === "/") {
				currDir = fileSystem;
			} else {
				currDir = currDir.subDirs.find(subDir => subDir.dirName === dirToGoTo);
			}
		} else if (line.startsWith("$ ls")) {
			// do nothing?
		}
	}


	const smallDirectories = [];
	checkForSmallDirectorySize(fileSystem, smallDirectories);
	const sum = smallDirectories.reduce((a, b) => a + b, 0);
	console.log(sum);
};

main();