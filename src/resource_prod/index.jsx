import { useEffect } from 'react';

import { useResearch, useResources, useResourcesSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';

import getElectronProd from './getElectronProd.js';
import getHydrogenProd from './getHydrogenProd.js';
import getNeutronProd from './getNeutronProd.js';
import getProtonProd from './getProtonProd.js';
import getQuarkProd from './getQuarkProd.js';

export const prodCalculation = {
	quark: getQuarkProd,
	electron: getElectronProd,
	proton: getProtonProd,
	neutron: getNeutronProd,
	hydrogen: getHydrogenProd,
	helium: () => ({ helium: 0 }),
};

export default function useResourceProduction() {
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();

	useEffect(() => {
		const id = setInterval(() => {
			setResources(resources => {
				for(const name in prodCalculation) {
					if (!prodCalculation.hasOwnProperty(name)) {
						console.warn(name);
						continue;
					}

					const deltas = prodCalculation[name](resources, unlockedResearch);

					// TODO: do not go negative

					for(const resourceName in deltas) {
						if (!deltas.hasOwnProperty(resourceName) || !resources.hasOwnProperty(resourceName)) {
							console.warn(resourceName);
							continue;
						}

						resources[resourceName] += deltas[resourceName];
					}
				}

				return { ...resources };
			});
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}