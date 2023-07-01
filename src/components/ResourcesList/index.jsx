import { withTranslation } from 'react-i18next';

import { useResources, useResourcesSetter } from '../../save';

import View from './view.jsx';

function ResourcesList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();

	return (
		<View
			resources={resources}
			setResources={setResources}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(ResourcesList);