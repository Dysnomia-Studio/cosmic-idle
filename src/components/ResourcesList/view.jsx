import formatNumber from '../../business/formatNumber.js';
import resourcesList from '../../business/resourcesList.js';

import { prodCalculation } from '../../resource_prod/index.jsx';
import { CALC_PER_SECOND } from '../../resource_prod/constants.js';

import './index.css';

export default function ResourcesList({ i18n, resources, setResources, stars, t, unlockedResearch }) {
	const prods = {};
	const consos = {};
	for(const resource of resourcesList) {
		const delta = prodCalculation[resource.id](resources, unlockedResearch, stars);

		for(const resourceName in delta) {
			if(resourceName === resource.id) {
				if(typeof prods[resourceName] !== 'number') {
					prods[resourceName] = 0;
				}
				prods[resourceName] += delta[resourceName];
			} else {
				if(typeof consos[resourceName] !== 'number') {
					consos[resourceName] = 0;
				}
				consos[resourceName] += delta[resourceName];
			}
		}
	}

	return (
		<ul className="resources-list">
			<li key="header" className="resource-list-item">
				<span className="resource-name">{t(`resources:name`)}</span>
				<span className="resource-value">{t(`resources:value`)}</span>
				<span className="resource-prod">{t(`resources:prod`)}</span>
				<span className="resource-conso">{t(`resources:conso`)}</span>
				<span className="resource-manual-btn"></span>
				<span className="resource-ingredients">{t(`resources:ingredients`)}</span>
			</li>

			{resourcesList.map((resource) => {
				if(!resource.showif(resources)) {
					return null;
				}

				return (
					<li key={resource.id} className="resource-list-item">
						<span className="resource-name">{t(`resources:${resource.id}`)}</span>
						<span className="resource-value">{formatNumber(resources[resource.id] || 0)}</span>
						<span className="resource-prod">{formatNumber(prods[resource.id] * CALC_PER_SECOND, 1)}/s</span>
						<span className="resource-conso">{formatNumber((consos[resource.id] || 0) * CALC_PER_SECOND, 1)}/s</span>
						{resource.button && 
							<input
								className="resource-manual-btn"
								type="button"
								onClick={() => resource.onClick(setResources)}
								value={resource.button}
							/>
						}
						{!resource.button && <span className="resource-manual-btn"></span>}
						<ul className="resource-ingredients">
							{Object.keys(resource.ingredients).map(id => <li key={id}>-{resource.ingredients[id]} {t(`resources:${id}`)}</li>)}
							<li>+1 {t(`resources:${resource.id}`)}</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
}
