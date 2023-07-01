import { useContext, useEffect, useState, createContext } from 'react';

import researchList from '../business/researchList.jsx';
import resourcesList from '../business/resourcesList.js';

export const SaveContext = createContext();

const LOCALSTORAGE_RESOURCES_KEY = 'resources';
const LOCALSTORAGE_RESEARCH_KEY = 'research';

let lastSave = Date.now();
const minSaveInterval = 5_000; // 5 seconds
export default function SaveContextProvider({ children }) {
	const [resources, setResources] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY) || '{}'));
	const [research, setResearch] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_RESEARCH_KEY) || '[]'));

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

	useEffect(() => {
		const stringifiedResearch = JSON.stringify(research);
		if(stringifiedResearch !== localStorage.getItem(LOCALSTORAGE_RESEARCH_KEY)) {
			localStorage.setItem(LOCALSTORAGE_RESEARCH_KEY, stringifiedResearch);
		}
	}, [research]);

	return (
		<SaveContext.Provider value={{ resources, setResources, research, setResearch }}>
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

export function useResearch() {
	return useContext(SaveContext).research;
}
export function useResearchSetter() {
	return useContext(SaveContext).setResearch;
}