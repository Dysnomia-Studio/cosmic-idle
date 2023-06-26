import useResourceProduction from './resource_prod/index.jsx';

import ResourcesList from './components/ResourcesList';

export default function App() {
	useResourceProduction();

	return (
		<ResourcesList />
	);
}
