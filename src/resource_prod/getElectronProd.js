import {
	ELECTRON_BASE_PROD,
} from './constants.js';
import getTotalMass from './getTotalMass.js';

export default function getElectronProd(resources, unlockedResearch) {
	if(!unlockedResearch.includes('fundamental_interactions')) {
		return { electron: 0 };
	}

	let mass = getTotalMass(resources);
	let base = mass * ELECTRON_BASE_PROD;

	return { electron: base };
}