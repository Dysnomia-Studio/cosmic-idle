import { useContext, useEffect, useState, createContext } from 'react';

import researchList from '../business/researchList.jsx';
import resourcesList from '../business/resourcesList.js';

export const SaveContext = createContext();

const LOCALSTORAGE_RESOURCES_KEY = 'resources';
const LOCALSTORAGE_RESEARCH_KEY = 'research';

let lastSave = Date.now();
const minSaveInterval = 5_000; // 5 seconds
export default function SaveContextProvider({ children }) {
	let defaultResources = {};
	try {
		defaultResources = JSON.parse(localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY) || '{}')
	} catch(e) {
		console.error(e);
	}

	let defaultResearch = [];
	try {
		defaultResearch = JSON.parse(localStorage.getItem(LOCALSTORAGE_RESEARCH_KEY) || '[]')
	} catch(e) {
		console.error(e);
	}

	const [resources, setResources] = useState(defaultResources);
	const [research, setResearch] = useState(defaultResearch);

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
		try {
			if(stringifiedResources !== localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY)) {
				localStorage.setItem(LOCALSTORAGE_RESOURCES_KEY, stringifiedResources);
			}
		} catch(e) {
			console.error(e);
		}

		lastSave = Date.now();
	}, [resources]);

	useEffect(() => {
		const stringifiedResearch = JSON.stringify(research);
		try {
			if(stringifiedResearch !== localStorage.getItem(LOCALSTORAGE_RESEARCH_KEY)) {
				localStorage.setItem(LOCALSTORAGE_RESEARCH_KEY, stringifiedResearch);
			}
		} catch(e) {
			console.error(e);
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