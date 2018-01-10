import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';

const CREATE_MEMO = 'memo/CREATE_MEMO';
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO';
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO';

export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo);
export const getInitialMemo = createAction(GET_INITIAL_MEMO, WebAPI.getInitialMemo);
export const getRecentMemo = createAction(GET_RECENT_MEMO, WebAPI.getRecentMemo);

const initialState = Map({
	data: List()
});

export default handleActions({
	...pender({
		type: GET_INITIAL_MEMO,
		onSuccess: (state, action) => state.set('data', fromJS(action.payload.data))
	}),
	...pender({
		type: GET_RECENT_MEMO,
		onSuccess: (state, action) => {
			const data = state.get('data');
			return state.set('data', fromJS(action.payload.data).concat(data));
		}
	})
}, initialState);