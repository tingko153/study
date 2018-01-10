import React, { Component } from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import WriteMemo from './WriteMemo';
import MemoListContainer from './MemoListContainer';
import MemoViewerContainer from './MemoViewerContainer';

import * as memoActions from 'modules/memo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends Component {
	async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

		const { MemoActions } = this.props;
        try {
            await MemoActions.getInitialMemo();
            this.getRecentMemo();
        }catch(e) {
            console.log(e);
        }
    }
    handleScroll = (e) => {
        const { clientHeight } = document.body;
        const { scrollTop } = document.documentElement;
        const { innerHeight } = window;

        if(clientHeight - innerHeight - scrollTop < 100) {
            console.log('end');
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
                <MemoViewerContainer />
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