import React, { Component } from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import WriteMemo from './WriteMemo';
import MemoListContainer from './MemoListContainer';

import * as memoActions from 'modules/memo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends Component {
	async componentDidMount() {
		const { MemoActions } = this.props;
        try {
            await MemoActions.getInitialMemo();
            this.getRecentMemo();
        }catch(e) {
            console.log(e);
        }
	}
    getRecentMemo = () => {
        const { MemoActions, cursor } = this.props;
        MemoActions.getRecentMemo(cursor ? cursor : 0);

        setTimeout(() => {
            this.getRecentMemo()
        }, 5000);
    }
    render() {
        return (
            <Layout>
                <Header />
                <Layout.Main>
                	<WriteMemo />
                	<MemoListContainer />
                </Layout.Main>
            </Layout>
        );
    }
}

export default connect(
	(state) => ({
        cursor: state.memo.getIn(['data', 0, 'id'])
    }),
	(dispatch) => ({
		MemoActions: bindActionCreators(memoActions, dispatch)
	})
)(App);