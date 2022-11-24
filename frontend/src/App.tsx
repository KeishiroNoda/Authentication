import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from "./Routes";
import { SnackbarContextProvider } from "./utils/Snackbar"
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<SnackbarContextProvider>
				<Routes />
			</SnackbarContextProvider>
		</QueryClientProvider>
	);
}

export default App;
