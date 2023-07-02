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

	return (
		<View
			resources={resources}
			formStar={formStar}
			disabled={!unlockedResearch.includes('protostars')}
			stars={stars}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(StarsList);