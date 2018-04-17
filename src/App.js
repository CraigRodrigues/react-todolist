import React, { Component } from 'react';
import { auth } from './firebase';

import Logo from './Logo';
import Loading from './Loading';
import Login from './Login';
import TodosContainer from './TodosContainer';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            loggedIn: false
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            user
                ? this.setState({ loggedIn: true, loading: false })
                : this.setState({ loggedIn: false, loading: false });
        });
    }

    render() {
        return (
            <div id="App">
                <Logo />
                {this.state.loading ? (
                    <Loading />
                ) : this.state.loggedIn ? (
                    <TodosContainer />
                ) : (
                    <Login />
                )}
            </div>
        );
    }
}
