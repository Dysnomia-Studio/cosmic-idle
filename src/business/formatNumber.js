export default function formatNumber(nb) {
	const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'];

	let value = Math.round(nb);
	let unitId = 0;
	while(value > 1000 && unitId < (units.length - 1)) {
		value = Math.round(value / 100) / 10;
		unitId++;
	}

	return value.toString() + units[unitId];
}