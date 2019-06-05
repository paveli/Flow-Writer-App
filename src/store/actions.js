import { UPDATE_TEXT, UPDATE_LATEST_TEXT, UPDATE_TITLE } from "./action-types";

export function updateText(payload) {
	return {
		type: UPDATE_TEXT,
		payload
	};
}

export function updateLatestText(payload) {
	return {
		type: UPDATE_LATEST_TEXT,
		payload
	};
}

export function updateTitle(payload) {
	return {
		type: UPDATE_TITLE,
		payload
	};
}
