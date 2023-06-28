import formatNumber from '../../business/formatNumber.js';
import resourcesList from '../../business/resourcesList.js';

import { prodCalculation } from '../../resource_prod/index.jsx';
import { CALC_PER_SECOND } from '../../resource_prod/constants.js';

import { useResources, useResourcesSetter } from '../../save';

import './index.css';

export default function ResourcesList() {
	const resources = useResources();
	const setResources = useResourcesSetter();

	return (
		<ul className="resources-list">
			{resourcesList.map((resource) => {
				if(!resource.showif(resources)) {
					return null;
				}

				return (
					<li key={resource.id} className="resource-list-item">
						<span className="resource-name">{resource.name}</span>
						<span className="resource-value">{formatNumber(resources[resource.id] || 0)}</span>
						<span className="resource-prod">{formatNumber(prodCalculation[resource.id](resources) * CALC_PER_SECOND, 1)}/s</span>
						{resource.button && 
							<input
								className="resource-manual-btn"
								type="button"
								onClick={() => resource.onClick(setResources)}
								value={resource.button}
							/>
						}
						{!resource.button && <span className="resource-manual-btn"></span>}
						<ul className="resources-ingredients">
							{Object.keys(resource.ingredients).map(id => <li>-{resource.ingredients[id]} {resourcesList.find(x => x.id === id).name}</li>)}
							<li>+1 {resource.name}</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
}
