import resourcesList from '../business/resourcesList.js';

export default function getTotalMass(resources) {
	let mass = 0;
	for(const elementName in resources) {
		if (!resources.hasOwnProperty(elementName)) {
			console.warn(elementName);
			continue;
		}
		mass += resources[elementName] * resourcesList.find(x => x.id === elementName).mass;
	}

	mass /= Math.log(Math.max(2, mass - 50));

	return mass;
}
