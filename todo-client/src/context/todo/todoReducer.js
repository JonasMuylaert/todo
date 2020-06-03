import {
	SET_TODOS,
	SET_LOADING,
	SET_ERROR,
	SET_PAGE,
	CLEAR_TODOS,
	SET_TODO,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_TODOS:
			return {
				...state,
				todos: action.payload,
			};
		case SET_TODO: {
			return {
				...state,
				todo: { ...state.todo, ...action.payload },
			};
		}
		case CLEAR_TODOS:
			return {
				...state,
				todos: [],
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
				page: action.payload ? action.payload : state.page++,
			};
		default:
			return state;
	}
};
