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
				return; // TODO: error
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
		setStars(localStars => {
			if(localStars.length !== stars.length) {
				return; // TODO: error because it changed
			}

			const outputStars = [...localStars];
			if(outputStars[i].stage === 'protostar') {
				outputStars[i].stage = 'star';
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