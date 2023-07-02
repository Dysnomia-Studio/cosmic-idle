export default function formatNumber(nb, keepNumbers = 0) {
	const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'];

	let negative = false;
	if(nb < 0) {
		negative = true;
		nb *= -1;
	}

	let value = Math.round(nb * Math.pow(10, keepNumbers)) / Math.pow(10, keepNumbers);
	let unitId = 0;
	while(value > 1000 && unitId < (units.length - 1)) {
		value = Math.round(value / 100) / 10;
		unitId++;
	}

	if(negative) {
		value *= -1;
	}

	return value.toString() + units[unitId];
}