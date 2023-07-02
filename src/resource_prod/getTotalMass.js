import resourcesList from '../business/resourcesList.js';

export default function getTotalMass(resources, stars) {
	let mass = 0;
	for(const elementName in resources) {
		if (!resources.hasOwnProperty(elementName)) {
			console.warn(elementName);
			continue;
		}
		mass += resources[elementName] * resourcesList.find(x => x.id === elementName).mass;
	}

	for(const star of stars) {
		for(const elementName in star.content) {
			if (!star.content.hasOwnProperty(elementName)) {
				console.warn(elementName);
				continue;
			}
			mass += star.content[elementName] * resourcesList.find(x => x.id === elementName).mass;
		}
	}

	mass /= Math.log(Math.max(2, mass - 50));

	return mass;
}
