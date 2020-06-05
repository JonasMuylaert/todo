import { SET_LOADING, SET_ERROR, SET_TODOS } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_TODOS:
			return {
				...state,
				todos: action.payload,
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
