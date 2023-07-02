import { useState } from 'react';

import formatNumber from '../../business/formatNumber.js';

import './index.css';

export default function StarsList({ disabled, formStar, evolveStar, i18n, resources, stars, t, unlockedResearch }) {
	const [percentage, setPercentage] = useState(100);
	function onPercentageChange(e) {
		setPercentage(e.target.value);
	}

	if(disabled) {
		return null;
	}

	const amount = Math.floor(Math.round(resources.hydrogen) * percentage / 100);

	return (
		<div className="stars-list">
			<div className="stars-list-header">
				<input type="range" min="1" max="100" step="0.1" value={percentage} onChange={onPercentageChange} />
				<span className="stars-list-header-text">{percentage}% → {formatNumber(amount)} {t('resources:hydrogen')}</span>
				{amount >= 1 && <input type="button" value="Form protostar" className="stars-list-form" onClick={() => formStar(amount)} />}
			</div>

			{stars.map((star, i) =>
				<div key={i} className="star-list-item">
					<h2>{t('stars:' + star.stage)}</h2>
					<img src={`img/${star.stage}.jpg`} alt={star.stage} />
					<span>Content:</span>
					<ul>
						{Object.keys(star.content).map(name => 
							<li>{formatNumber(star.content[name])} {t('resource:' + name)}</li>
						)}
					</ul>
					<div className="star-list-item-buttons">
						{star.stage === 'protostar' && unlockedResearch.includes('nuclear_fusion') && <input type="button" value="Evolve to star" onClick={() => evolveStar(i)} />}
						{star.stage === 'star' && <input type="button" value="Star Death" onClick={() => evolveStar(i)} />}
					</div>
				</div>
			)}
		</div>
	);
}