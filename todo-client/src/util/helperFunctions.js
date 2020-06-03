export const dateParser = date => {
	// const regExp = /[0-9]{4}-[0-9]+-[0-9]+/gm;
	// const newDate = date.match(regExp)[0].split('-').reverse().join('-');
	// return newDate;

	const newDate = new Date(date);
	const resDate = [
		newDate.getDate(),
		newDate.getMonth() + 1,
		newDate.getFullYear(),
	];

	return resDate.join('-');
};

export const shortenTitle = (title, maxLength) => {
	if (title.length >= maxLength) {
		const strArr = title.split('');
		const newStrArr = strArr.slice(0, maxLength - 1);
		return newStrArr.join('').concat('...');
	}
	return title;
};
