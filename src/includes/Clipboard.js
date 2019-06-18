import * as clipboard from "clipboard-polyfill";

const Clipboard = (text, alertText) => {
	clipboard.writeText(text).then(res => {
		if (alertText) {
			alert(alertText);
		}
	});
};

export default Clipboard;
