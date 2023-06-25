import formatNumber from './business/formatNumber.js';
import { useResources } from './save/index.jsx';
import useResourceProduction from './resource_prod/index.jsx';

export default function App() {
	const resources = useResources();
	
	useResourceProduction();

	return (
		<ul>
			<li><span>Particles:</span> {formatNumber(resources.particles)}</li>
		</ul>
	);
}
