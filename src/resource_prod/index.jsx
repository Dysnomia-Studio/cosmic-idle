import { useEffect } from 'react';

import { useResources, useResourcesSetter } from '../save/index.jsx';

import { PRODUCTION_INTERVAL } from './constants.js';
import getParticlesProd from './getParticlesProd.js';

export default function useResourceProduction() {
	const resources = useResources();
	const setResources = useResourcesSetter();

	useEffect(() => {
		const id = setInterval(() => {
			resources.particles += getParticlesProd();

			setResources({ ...resources });
		}, PRODUCTION_INTERVAL);

		return () => clearInterval(id);
	}, [])
}