import {
	NEUTRON_BASE_PROD,
} from './constants.js';
import getTotalMass from './getTotalMass.js';

export default function getNeutronProd(resources, unlockedResearch) {
	if(!unlockedResearch.includes('fundamental_interactions')) {
		return { neutron: 0 };
	}

	let mass = getTotalMass(resources);
	let base = mass * NEUTRON_BASE_PROD;

	return { neutron: base, quark: -3 * base };
}