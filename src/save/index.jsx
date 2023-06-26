import { useContext, useEffect, useState, createContext } from 'react';

import resourcesList from '../business/resourcesList.js';

export const SaveContext = createContext();

const LOCALSTORAGE_RESOURCES_KEY = 'resources';

let lastSave = Date.now();
const minSaveInterval = 5_000; // 5 seconds
export default function SaveContextProvider({ children }) {
	const [resources, setResources] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY) || '{}'));

	useEffect(() => {
		for(const resource of resourcesList) {
			if(!resources[resource.id]) {
				resources[resource.id] = 0;
			}
		}

		if((Date.now() - lastSave) < minSaveInterval) {
			return;
		}

		const stringifiedResources = JSON.stringify(resources);
		if(stringifiedResources !== localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY)) {
			localStorage.setItem(LOCALSTORAGE_RESOURCES_KEY, stringifiedResources);
		}

		lastSave = Date.now();
	}, [resources]);

	return (
		<SaveContext.Provider value={{ resources, setResources }}>
			{children}
		</SaveContext.Provider>
	);
}

export function useResources() {
	return useContext(SaveContext).resources;
}

export function useResourcesSetter() {
	return useContext(SaveContext).setResources;
}