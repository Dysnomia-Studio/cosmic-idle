import { PARTICLES_PROD } from './constants.js';

import resourcesList from '../business/resourcesList.js';

export default function getParticlesProd(resources) {
	let mass = 0;
	for(const elementName in resources) {
		mass += resources[elementName] * resourcesList.find(x => x.id === elementName).mass;
	}
	const base = mass * PARTICLES_PROD;

	return base;
}