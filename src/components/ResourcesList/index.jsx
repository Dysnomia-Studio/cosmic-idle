import { withTranslation } from 'react-i18next';

import { useResources, useResourcesSetter, useResearch } from '../../save';

import View from './view.jsx';

function ResourcesList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();

	return (
		<View
			resources={resources}
			setResources={setResources}
			unlockedResearch={unlockedResearch}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(ResourcesList);