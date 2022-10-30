import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";
import { SnackbarContextProvider } from "./utils/Snackbar"

function App() {

	return (
		<SnackbarContextProvider>
			<Routes />
		</SnackbarContextProvider>
	);
}

export default App;
