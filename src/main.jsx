import React from 'react';
import ReactDOM from 'react-dom/client';

import SaveContextProvider from './save/index.jsx';
import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SaveContextProvider>
			<App />
		</SaveContextProvider>
	</React.StrictMode>,
);
