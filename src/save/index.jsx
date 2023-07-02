import { useContext, useEffect, useState, createContext } from 'react';

import researchList from '../business/researchList.jsx';
import resourcesList from '../business/resourcesList.js';

export const SaveContext = createContext();

const LOCALSTORAGE_RESOURCES_KEY = 'resources';
const LOCALSTORAGE_RESEARCH_KEY = 'research';
const LOCALSTORAGE_STAR_KEY = 'star';

let lastSave = Date.now();
const minSaveInterval = 5_000; // 5 seconds
export default function SaveContextProvider({ children }) {
	let defaultResources = {};
	try {
		defaultResources = JSON.parse(localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY) || '{}')
	} catch { }

	let defaultResearch = [];
	try {
		defaultResearch = JSON.parse(localStorage.getItem(LOCALSTORAGE_RESEARCH_KEY) || '[]')
	} catch { }
	let defaultStars = [];
	try {
		defaultStars = JSON.parse(localStorage.getItem(LOCALSTORAGE_STAR_KEY) || '[]')
	} catch { }

	const [resources, setResources] = useState(defaultResources);
	const [research, setResearch] = useState(defaultResearch);
	const [stars, setStars] = useState(defaultStars);

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

	useEffect(() => {
		const stringifiedStars = JSON.stringify(stars);
		try {
			if(stringifiedStars !== localStorage.getItem(LOCALSTORAGE_STAR_KEY)) {
				localStorage.setItem(LOCALSTORAGE_STAR_KEY, stringifiedStars);
			}
		} catch(e) {
			console.error(e);
		}
	}, [stars]);

	return (
		<SaveContext.Provider value={{ resources, setResources, research, setResearch, stars, setStars }}>
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

export function useStars() {
	return useContext(SaveContext).stars;
}
export function useStarsSetter() {
	return useContext(SaveContext).setStars;
}