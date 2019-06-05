import * as actionTypes from "./action-types";

const initialState = {
	text: "",
	latestText: "",
	title: ""
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_TEXT: {
			return {
				...state,
				text: action.payload.text,
				latestText: action.payload.latestText
			};
		}
		case actionTypes.UPDATE_LATEST_TEXT: {
			return {
				...state,
				latestText: action.payload.latestText
			};
		}
		case actionTypes.UPDATE_TITLE: {
			return {
				...state,
				title: action.payload.title
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
