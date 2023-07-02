import { useState } from 'react';

import formatNumber from '../../business/formatNumber.js';

import './index.css';

export default function StarsList({ disabled, formStar, evolveStar, i18n, resources, stars, t }) {
	const [percentage, setPercentage] = useState(50);
	function onPercentageChange(e) {
		setPercentage(e.target.value);
	}

	const amount = Math.floor(Math.round(resources.hydrogen) * percentage / 100);

	return (
		<div className="stars-list">
			<div className="stars-list-header">
				<input type="range" min="1" max="100" step="0.1" value={percentage} onChange={onPercentageChange} />
				<span className="stars-list-header-text">{percentage}% → {formatNumber(amount)} {t('resources:hydrogen')}</span>
				{(!disabled && amount >= 1) && <input type="button" value="Form protostar" className="stars-list-form" onClick={() => formStar(amount)} />}
			</div>

			{stars.map((star, i) =>
				<div key={i} className="star-list-item">
					<h2>{t('stars:' + star.stage)}</h2>
					<img src={`img/${star.stage}.jpg`} alt={star.stage} />
					<span>Content:</span>
					<ul>
						{Object.keys(star.content).map(name => 
							<li>{star.content[name]} {t('resource:' + name)}</li>
						)}
					</ul>
					<div className="star-list-item-buttons">
						{star.stage === 'protostar' && <input type="button" value="Evolve to star" onClick={() => evolveStar(i)} />}
						{star.stage === 'star' && <input type="button" value="Star Death" onClick={() => evolveStar(i)} />}
					</div>
				</div>
			)}
		</div>
	);
}