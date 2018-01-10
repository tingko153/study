import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';

const CREATE_MEMO = 'memo/CREATE_MEMO';
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO';
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO';
const UPDATE_MEMO = 'memo/UPDATE_MEMO';
const DELETE_MEMO = 'memo/DELETE_MEMO';
const GET_PREVIOUS_MEMO = 'memo/GET_PREVIOUS_MEMO';

export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo);
export const getInitialMemo = createAction(GET_INITIAL_MEMO, WebAPI.getInitialMemo);
export const getRecentMemo = createAction(GET_RECENT_MEMO, WebAPI.getRecentMemo);
export const updateMemo = createAction(UPDATE_MEMO, WebAPI.updateMemo, payload => payload);
export const deleteMemo = createAction(DELETE_MEMO, WebAPI.deleteMemo, payload => payload);
export const getPreviousMemo = createAction(GET_PREVIOUS_MEMO, WebAPI.getPreviousMemo);

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
	}),
	...pender({
		type: UPDATE_MEMO,
		onSuccess: (state, action) => {
			const { id, memo: {title, body}} = action.meta;
			const index = state.get('data').findIndex(memo => memo.get('id') === id);
			return state.updateIn(['data', index], (memo) => memo.merge({
				title,
				body
			}))
		}
	}),
	...pender({
		type: DELETE_MEMO,
		onSuccess: (state, action) => {
			const id = action.meta;
			const index = state.get('data').findIndex(memo => memo.get('id') === id);
			return state.deleteIn(['data', index]);
		}
	}),
	...pender({
		type: GET_PREVIOUS_MEMO,
		onSuccess: (state, action) => {
			const data = state.get('data');
			return state.set('data', data.concat(fromJS(action.payload.data)))
		}
	})
}, initialState);