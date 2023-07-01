import {
	PROTON_BASE_PROD,
} from './constants.js';
import getTotalMass from './getTotalMass.js';

export default function getProtonProd(resources, unlockedResearch) {
	if(!unlockedResearch.includes('fundamental_interactions')) {
		return { proton: 0 };
	}

	let mass = getTotalMass(resources);
	let base = mass * PROTON_BASE_PROD;

	return { proton: base, quark: -3 * base };
}