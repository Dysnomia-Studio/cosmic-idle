import { useContext, useEffect, useState, createContext } from 'react';

export const SaveContext = createContext();

const LOCALSTORAGE_RESOURCES_KEY = 'resources';

let lastSave = Date.now();
const minSaveInterval = 5_000; // 5 seconds
export default function SaveContextProvider({ children }) {
	const [resources, setResources] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_RESOURCES_KEY) || '{ "particles": 0 }'));

	useEffect(() => {
		if((Date.now() - lastSave) < minSaveInterval) {
			return;
		}

		console.log(resources);

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