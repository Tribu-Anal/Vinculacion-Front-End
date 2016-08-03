'use strict';

module.exports = {
	sharedCase: text => {
		let startIndex = 0;
		let newStr = '';

		for (let i = 1; i < text.length; i++) {
			const c = text[i];
			if (c === '-' || i + 1 === text.length ) {
				let tmp = text.slice(startIndex+1, i+1);

				newStr += text[startIndex].toUpperCase() + tmp;

				startIndex = i+1;
			}
		}

		return newStr;
	}
};