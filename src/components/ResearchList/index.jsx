import { withTranslation } from 'react-i18next';

import { useResearch, useResearchSetter, useResourcesSetter } from '../../save';
import researchList from '../../business/researchList.jsx';

import View from './view.jsx';

function ResearchList({ t, i18n }) {
	const unlockedResearch = useResearch();
	const setUnlockedResearch = useResearchSetter();
	const setResources = useResourcesSetter();

	function unlockResearch(id) {
		if(unlockedResearch.includes(id)) {
			return; // TODO: error
		}

		const researchData = researchList.find(x => x.id === id);

		if(!id) {
			return; // TODO: error
		}

		setResources(inputResources => {
			const resources = { ...inputResources };
			for(const resourceName in researchData.cost) {
				if(resources[resourceName] < researchData.cost[resourceName]) {
					return inputResources; // TODO: error
				}
			}

			for(const resourceName in researchData.cost) {
				resources[resourceName] -= researchData.cost[resourceName];
			}

			setUnlockedResearch(researchList => [...researchList, id]);

			return resources;
		});
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