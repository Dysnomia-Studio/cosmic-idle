import { withTranslation } from 'react-i18next';

import { useResources, useResourcesSetter, useResearch } from '../../save';

import View from './view.jsx';

function StarsList({ t, i18n }) {
	const resources = useResources();
	const setResources = useResourcesSetter();
	const unlockedResearch = useResearch();

	function formStar(amount) {
		console.log(amount);
		/* TODO */
	}

	return (
		<View
			resources={resources}
			formStar={formStar}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(StarsList);