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
					<li key={resource.id}>
						<span className="resource-name">{resource.name}</span>
						<span className="resource-value">{formatNumber(resources[resource.id] || 0)}</span>
						<span className="resource-value">{formatNumber(prodCalculation[resource.id](resources) * CALC_PER_SECOND, 1)}/s</span>
						<input className="resource-manual-btn" type="button" onClick={() => resource.onClick(setResources)} value={resource.button} />
					</li>
				);
			})}
		</ul>
	);
}
