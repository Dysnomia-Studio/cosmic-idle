import { withTranslation } from 'react-i18next';

import { useResources, useResourcesSetter, useResearch, useStars, useStarsSetter } from '../../save';

import View from './view.jsx';

function StarsList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();
	const stars = useStars();
	const setStars = useStarsSetter();

	function formStar(amount) {
		setResources(inputResources => {
			if(inputResources.hydrogen < amount) {
				return inputResources; // TODO: error
			}

			setStars(localStars => [
				...localStars,
				{ stage: 'protostar', content: { hydrogen: amount } },
			]);

			return {
				...inputResources,
				hydrogen: inputResources.hydrogen - amount
			}
		});
	}

	function evolveStar(i) {
		if(i >= stars.length) {
			return; // TODO: error
		}

		setStars(localStars => {
			if(localStars.length !== stars.length) {
				return localStars; // TODO: error because it changed
			}

			let outputStars = [...localStars];
			if(outputStars[i].stage === 'protostar') {
				outputStars[i].stage = 'star';
			} else if(outputStars[i].stage === 'star') {
				const starCopy = outputStars.splice(i, 1)[0];
				setResources(inputResources => {
					const newResources = { ...inputResources };

					for(const elementName in starCopy.content) {
						if(typeof newResources[elementName] !== 'number') {
							newResources[elementName] = 0;
						}

						newResources[elementName] += starCopy.content[elementName];
					}

					return newResources;
				});
			}

			return outputStars;
		});
	}

	return (
		<View
			resources={resources}
			formStar={formStar}
			evolveStar={evolveStar}
			disabled={!unlockedResearch.includes('protostars')}
			unlockedResearch={unlockedResearch}
			stars={stars}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(StarsList);