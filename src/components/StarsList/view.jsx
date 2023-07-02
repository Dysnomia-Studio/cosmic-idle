import { useState } from 'react';

import formatNumber from '../../business/formatNumber.js';

import './index.css';

export default function StarsList({ disabled, formStar, i18n, resources, t }) {
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
		</div>
	);
}