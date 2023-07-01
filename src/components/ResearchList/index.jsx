import View from './view.jsx';

import { useResearch, useResearchSetter } from '../../save';
import { withTranslation } from 'react-i18next';

function ResearchList({ t, i18n }) {
	const unlockedResearch = useResearch();
	const setUnlockedResearch = useResearchSetter();

	function unlockResearch(id) {
		// TODO
		console.log('unlock ' + id)
	}

	return (
		<View
			unlockResearch={unlockResearch}
			unlockedResearch={unlockedResearch}
			t={t}
			i18n={i18n}
		/>
	);
}

export default withTranslation()(ResearchList);