import { useEffect } from 'react';

import { useResearch, useResources, useResourcesSetter, useStars, useStarsSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';

import getElectronProd from './getElectronProd.js';
import getHydrogenProd from './getHydrogenProd.js';
import getHeliumProd from './getHeliumProd.js';
import getNeutronProd from './getNeutronProd.js';
import getProtonProd from './getProtonProd.js';
import getQuarkProd from './getQuarkProd.js';

export const prodCalculation = {
	quark: getQuarkProd,
	electron: getElectronProd,
	proton: getProtonProd,
	neutron: getNeutronProd,
	hydrogen: getHydrogenProd,
	helium: getHeliumProd,
	lithium: (_res, _unlockedResearch, stars) => [{ lithium: 0 }, stars],
	beryllium: (_res, _unlockedResearch, stars) => [{ beryllium: 0 }, stars],
	bore: (_res, _unlockedResearch, stars) => [{ bore: 0 }, stars],
};

export default function useResourceProduction() {
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();
	const stars = useStars();
	const setStars = useStarsSetter();

	useEffect(() => {
		const id = setInterval(() => {
			setResources(resources => {
				let refinedStars = [...stars];

				for(const name in prodCalculation) {
					if (!prodCalculation.hasOwnProperty(name)) {
						console.warn(name);
						continue;
					}

					let deltas;
					[deltas, refinedStars] = prodCalculation[name](resources, unlockedResearch, refinedStars);

					// TODO: do not go negative

					for(const resourceName in deltas) {
						if (!deltas.hasOwnProperty(resourceName) || !resources.hasOwnProperty(resourceName)) {
							console.warn(resourceName);
							continue;
						}

						resources[resourceName] += deltas[resourceName];
					}
				}

				setStars((localStars) => {
					if(localStars.length !== refinedStars.length) {
						return localStars; // TODO: error
					}

					return refinedStars;
				});

				return { ...resources };
			});
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}