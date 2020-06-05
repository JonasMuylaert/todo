import { SET_AUTH } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_AUTH:
			return {
				isAuth: action.payload,
			};
		default:
			return state;
	}
};
