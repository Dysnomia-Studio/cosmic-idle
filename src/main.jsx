import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import SaveContextProvider from './save/index.jsx';
import App from './App.jsx';

import enTranslation from './i18n/en.jsx';

import './index.css';

i18n.use(initReactI18next)
	.init({
		resources: {
			en: enTranslation
		},
		lng: 'en',
		fallbackLng: 'en',

		interpolation: {
			escapeValue: false
		}
	});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SaveContextProvider>
			<App />
		</SaveContextProvider>
	</React.StrictMode>,
);
