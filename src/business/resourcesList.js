const resourcesList = [
	{
		showif: (resources) => true,
		id: 'particles',
		name: 'Particles',
		onClick: (setResources) => {
			setResources(resources => ({ ...resources, particles: resources.particles + 1 }));
		},
		button: 'Gather'
	},
	{
		showif: (resources) => typeof resources.particles === 'number',
		id: 'hydrogen',
		name: 'Hydrogen',
		onClick: (setResources) => {
			setResources(resources => { 
				const localResources = { ...resources };
				if(localResources.particles >= 2) {
					localResources.particles -= 2;
					localResources.hydrogen += 1;
				}

				return { ...localResources };
			});
		},
		button: 'Merge 2 x Particles'
	},
	{
		showif: (resources) => typeof resources.hydrogen === 'number',
		id: 'helium',
		name: 'Helium',
		onClick: (setResources) => {
			setResources(resources => { 
				const localResources = { ...resources };
				if(localResources.hydrogen >= 2) {
					localResources.hydrogen -= 2;
					localResources.helium += 1;
				}

				return { ...localResources };
			});
		},
		button: 'Merge 2 x Hydrogen'
	}
];

export default resourcesList;
