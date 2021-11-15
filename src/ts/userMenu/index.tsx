import { useEffect, useState, StrictMode } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import SettingsMenu from "./components/settingsMenu";
import ShowMenuButton from "./components/showMenuButton";
import { store, IRootState } from "./store";

const initialized = false;
const localStorageSettingsKey = "pronouns_settings";

export function initUserMenu(selector: string = "#root") {
	if (initialized) {
		return;
	}

	const userMenuParent = document.createElement('div');
	render(<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>, userMenuParent);

	document.querySelector(selector)?.append(userMenuParent);
}

function App() {
	return <>
	</>;
}
