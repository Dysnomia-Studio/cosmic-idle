import View from './view.jsx';

import { useResources, useResourcesSetter } from '../../save';
import { withTranslation } from 'react-i18next';

function ResourcesList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();

	return (
		<View
			resources={resources}
			useResources={useResources}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(ResourcesList);