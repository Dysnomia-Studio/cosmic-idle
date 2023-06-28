import { useEffect } from 'react';

import { useResources, useResourcesSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';
import getParticlesProd from './getParticlesProd.js';

export const prodCalculation = {
	quark: getParticlesProd,
	electron: () => 0,
	proton: () => 0,
	neutron: () => 0,
	hydrogen: () => 0,
	helium: () => 0,
};

export default function useResourceProduction() {
	const setResources = useResourcesSetter();

	useEffect(() => {
		const id = setInterval(() => {
			setResources(resources => {
				for(const name in prodCalculation) {
					resources[name] += prodCalculation[name](resources);
				}

				return { ...resources };
			});
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}