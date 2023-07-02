import {
	HYDROGEN_BASE_PROD,
} from './constants.js';
import getTotalMass from './getTotalMass.js';

export default function getHydrogenProd(resources, unlockedResearch) {
	if(!unlockedResearch.includes('fundamental_interactions')) {
		return { hydrogen: 0 };
	}

	let mass = getTotalMass(resources);
	let base = mass * HYDROGEN_BASE_PROD;

	return { hydrogen: base, proton: -1 * base, electron: -1 * base };
}