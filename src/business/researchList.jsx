const researchList = [
	{
		id: 'fundamental_interactions',
		description: (
			<>
				<p>Particles now will attract each other.</p>
				<ul>
					<li>Increase automatic quark gathering</li>
					<li>Increase automatic proton formation</li>
					<li>Increase automatic hydrogen formation</li>
				</ul>
			</>
		),
		cost: { quark: 15, electron: 15 },
	}, {
		id: 'protostars',
		description: <p>Grant the ability to form protostars</p>,
		cost: { proton: 25 }
	}, {
		id: 'nuclear_fusion',
		description: <p>Grant the ability to evolve protostars into stars. Stars will automaticaly create light elements from hydrogen.</p>,
		cost: { hydrogen: 25 }
	}
];

export default researchList;
