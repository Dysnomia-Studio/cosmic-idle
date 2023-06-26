import formatNumber from '../../business/formatNumber.js';
import resourcesList from '../../business/resourcesList.js';

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
						<input className="resource-manual-btn" type="button" onClick={() => resource.onClick(setResources)} value={resource.button} />
					</li>
				);
			})}
		</ul>
	);
}
