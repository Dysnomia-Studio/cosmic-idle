const researchList = [
	{
		id: 'fundamental_interactions',
		name: 'Fundamental Interactions',
		description: (
			<>
				<p>Particles now will attract each other.</p>
				<ul>
					<li>Increase automatic quark gathering</li>
					<li>Increase automatic proton formation</li>
					<li>Increase automatic hydrogen formation</li>
				</ul>
			</>
		)
	}, {
		id: 'protostars',
		name: 'Protostars',
		description: <p>Grant the ability to form protostars</p>
	}, {
		id: 'nuclear_fusion',
		name: 'Nuclear Fusion',
		description: <p>Grant the ability to evolve protostars into stars. Stars will automaticaly create light elements from hydrogen.</p>
	}
];

export default researchList;
