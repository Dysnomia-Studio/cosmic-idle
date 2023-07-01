import formatNumber from '../../business/formatNumber.js';
import researchList from '../../business/researchList.jsx';

import './index.css';

export default function ResearchList({ i18n, t, unlockResearch, unlockedResearch }) {
	return (
		<ul className="research-list">
			{researchList.map((research) => {
				let className = 'research-list-item';
				if(unlockedResearch.includes(research.id)) {
					className += ' research-list-item-researched';
				}

				return (
					<li key={research.id} className={className} onClick={() => unlockResearch(research.id)}>
						<h3 className="research-name">{t(`research:${research.id}`)}</h3>
						{research.description}
						<p>Cost: {Object.keys(research.cost).map(c => <span key={c} className="resource-cost-item">{formatNumber(research.cost[c])} {c}</span>)}</p>
						<input type="button" value="✔" />
					</li>
				);
			})}
		</ul>
	);
}
