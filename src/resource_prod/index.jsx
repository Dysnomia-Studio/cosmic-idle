import { useEffect } from 'react';

import { useResearch, useResources, useResourcesSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';

import getElectronProd from './getElectronProd.js';
import getNeutronProd from './getNeutronProd.js';
import getProtonProd from './getProtonProd.js';
import getQuarkProd from './getQuarkProd.js';

export const prodCalculation = {
	quark: getQuarkProd,
	electron: getElectronProd,
	proton: getProtonProd,
	neutron: getNeutronProd,
	hydrogen: () => ({ hydrogen: 0 }),
	helium: () => ({ helium: 0 }),
};

export default function useResourceProduction() {
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();

	useEffect(() => {
		const id = setInterval(() => {
			setResources(resources => {
				for(const name in prodCalculation) {
					const deltas = prodCalculation[name](resources, unlockedResearch);

					// TODO: do not go negative

					for(const resourceName in deltas) {
						resources[resourceName] += deltas[resourceName];
					}
				}

				return { ...resources };
			});
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}