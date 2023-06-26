import { useEffect } from 'react';

import { useResources, useResourcesSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';
import getParticlesProd from './getParticlesProd.js';

export default function useResourceProduction() {
	const setResources = useResourcesSetter();

	useEffect(() => {
		const id = setInterval(() => {
			setResources(resources => {
				resources.particles += getParticlesProd();

				return { ...resources };
			});
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}