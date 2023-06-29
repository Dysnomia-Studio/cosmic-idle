import formatNumber from '../../business/formatNumber.js';
import researchList from '../../business/researchList.jsx';

import { prodCalculation } from '../../resource_prod/index.jsx';
import { CALC_PER_SECOND } from '../../resource_prod/constants.js';

import { useResearch, useResearchSetter } from '../../save';

import './index.css';

export default function ResearchList() {
	const unlockedResearch = useResearch();
	const setUnlockedResearch = useResearchSetter();

	function unlockResearch(id) {
		// TODO
		console.log('unlock ' + id)
	}

	return (
		<ul className="research-list">
			{researchList.map((research) => {
				let className = 'research-list-item';
				if(unlockedResearch.includes(research.id)) {
					className += ' research-list-item-researched';
				}

				return (
					<li key={research.id} className={className} onClick={() => unlockResearch(research.id)}>
						<h3 className="research-name">{research.name}</h3>
						{research.description}
						<input type="button" value="✔" />
					</li>
				);
			})}
		</ul>
	);
}
