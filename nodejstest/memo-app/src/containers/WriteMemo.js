import React, { Component } from 'react';
import { InputPlaceholder, WhiteBox } from 'components/WriteMemo';
import { InputSet, SaveButton } from 'components/Shared';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'modules/ui';
import enhanceWithClickOutside from 'react-click-outside';
import * as memoActions from 'modules/memo';

class WriteMemo extends Component {
	handleFocus = () => {
		const { focused, UIActions } = this.props;

		if(!focused) {
			UIActions.focusInput();
		}
	}
	handleClickOutside = () => {
		const { UIActions, focused, title, body } = this.props;

		if(focused) {
			if( title !== '' || body !== '') return;
			UIActions.blurInput();
		}
	}
	handleChange = (e) => {
		const { UIActions } = this.props;
		const { name, value } = e.target;

		UIActions.changeInput({name, value});
	}
	handleCreate = async () => {
		const { title, body, cursor, MemoActions, UIActions } = this.props;
		try {
			await MemoActions.createMemo({
				title, body
			});
			await MemoActions.getRecentMemo(cursor ? cursor : 0);
			UIActions.resetInput();
		}catch(e) {
			console.log(e);
		}
	}
	render() {
		const { handleFocus, handleChange, handleCreate } = this;
		const { focused, title, body } = this.props;

		return (
			focused ? (
				<WhiteBox>
					<InputSet onChange={handleChange} title={title} body={body}/>
					<SaveButton onClick={handleCreate}/>
				</WhiteBox>
			) : (
				<WhiteBox onClick={handleFocus}>
					<InputPlaceholder />
				</WhiteBox>
			)
		);
	}
}

export default connect(
	(state) => ({
		focused: state.ui.getIn(['write', 'focused']),
		title: state.ui.getIn(['write', 'title']),
		body: state.ui.getIn(['write', 'body']),
		cursor: state.memo.getIn(['data', 0, 'id'])
	}),
	(dispatch) => ({
		UIActions: bindActionCreators(uiActions, dispatch),
		MemoActions: bindActionCreators(memoActions, dispatch)
	})
)(enhanceWithClickOutside(WriteMemo));