let resourcesList = [
	{
		showif: (resources) => true,
		id: 'quark',
		name: 'Quark',
		mass: 0.1,
		ingredients: {},
		button: 'Gather'
	},
	{
		showif: (resources) => true,
		id: 'electron',
		name: 'Electron',
		mass: 0.01,
		ingredients: {},
		button: 'Gather'
	},
	{
		showif: (resources) => typeof resources.quark === 'number',
		id: 'proton',
		name: 'Proton',
		mass: 1,
		ingredients: { quark: 3 },
		button: 'Form'
	},
	{
		showif: (resources) => typeof resources.quark === 'number',
		id: 'neutron',
		name: 'Neutron',
		mass: 1,
		ingredients: { quark: 3 },
		button: 'Form'
	},
	{
		showif: (resources) => typeof resources.proton === 'number' && typeof resources.hydrogen === 'number',
		id: 'hydrogen',
		name: 'Hydrogen',
		mass: 1,
		ingredients: { electron: 1, proton: 1 },
		button: 'Form'
	},
	{
		showif: (resources) => typeof resources.hydrogen === 'number',
		id: 'helium',
		name: 'Helium',
		mass: 2,
		ingredients: { hydrogen: 2 },
		button: null
	}
];

resourcesList = resourcesList.map(x => {
	x.produce = (amount, inputResources) => {
		const resources = {...inputResources};

		for(let ingredientName in x.ingredients) {
			if(x.ingredients[ingredientName] > resources[ingredientName]) {
				return resources;
			}
		}

		// Here, we are okay with ingredients
		for(let ingredientName in x.ingredients) {
			resources[ingredientName] -= x.ingredients[ingredientName];
		}
		resources[x.id] += amount;

		console.log(resources);

		return resources;
	};

	x.onClick = (setResources) => {
		setResources(resources => {
			return x.produce(1, resources);
		});
	};

	return x;
})

export default resourcesList;