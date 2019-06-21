import React, { Component } from "react";
import Hotkeys from "react-hot-keys";

class FullScreen extends Component {
	handleClick = () => {
		let TextEditor = document.getElementById("TextEditor");
		TextEditor.requestFullscreen().then(resolve => {
			document.getElementById("currentInput").focus({ preventScroll: false });
		});
	};
	render() {
		return (
			<Hotkeys
				keyName="ctrl+shift+f"
				onKeyUp={this.handleClick}
				filter={event => {
					return true;
				}}
			/>
		);
	}
}

export default FullScreen;
