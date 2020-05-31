import { SET_TODOS, SET_LOADING, SET_ERROR, SET_PAGE } from '../types';

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

		case SET_PAGE:
			return {
				...state,
				page: state.page++,
			};
		default:
			return state;
	}
};
