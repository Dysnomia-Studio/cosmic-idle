import useResourceProduction from './resource_prod/index.jsx';

import ResearchList from './components/ResearchList';
import ResourcesList from './components/ResourcesList';
import StarsList from './components/StarsList';

export default function App() {
	useResourceProduction();

	return (
		<>
			<ResourcesList />
			<StarsList />
			<ResearchList />
		</>
	);
}
