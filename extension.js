const vscode = require('vscode');

function activate(context) {
	let startTime = Date.now();

	let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = "0s";
	statusBarItem.show();

	// Update the status bar every second
	setInterval(() => {
		let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
		let hours = Math.floor(elapsedTime / 3600);
		let minutes = Math.floor((elapsedTime % 3600) / 60);
		let seconds = elapsedTime % 60;

		let timeString = '';
		if (hours > 0) {
			timeString += `${hours}:`;
			timeString += minutes.toString().padStart(2, '0') + ':';
			timeString += seconds.toString().padStart(2, '0');
		} else if (minutes > 0) {
			timeString += `${minutes}:`;
			timeString += seconds.toString().padStart(2, '0');
		} else {
			timeString += seconds + 's';
		}

		statusBarItem.text = `${timeString}`;
	}, 1000);

	context.subscriptions.push(statusBarItem);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
