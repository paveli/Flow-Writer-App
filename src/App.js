import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Menu from "./components/Menu";
import TextEditor from "./components/TextEditor";
import Onboarding from "./components/Onboarding";

import reducer from "./store/reducer";

import "./App.css";

const store = createStore(reducer);

function App() {
	return (
		<Provider store={store}>
			<Menu />
			<TextEditor />
			<Onboarding />
		</Provider>
	);
}

export default App;
