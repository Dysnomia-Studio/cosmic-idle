import {
	QUARK_PROD,
	QUARK_FUNDAMENTAL_INTERACTIONS_MULTIPLIER
} from './constants.js';
import getTotalMass from './getTotalMass.js';

export default function getQuarkProd(resources, unlockedResearch) {
	let mass = getTotalMass(resources);
	let base = mass * QUARK_PROD;

	if(unlockedResearch.includes('fundamental_interactions')) {
		base *= QUARK_FUNDAMENTAL_INTERACTIONS_MULTIPLIER;
	}

	return { quark: base };
}