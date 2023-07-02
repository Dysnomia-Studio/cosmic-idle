import { withTranslation } from 'react-i18next';

import { useResources, useResourcesSetter, useResearch, useStars } from '../../save';

import View from './view.jsx';

function ResourcesList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();
	const stars = useStars();

	return (
		<View
			resources={resources}
			setResources={setResources}
			stars={stars}
			unlockedResearch={unlockedResearch}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(ResourcesList);