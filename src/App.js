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
        if (this.state.loading) {
            return (
                <div id="App">
                    <Logo />
                    <Loading />
                </div>
            );
        }

        if (this.state.loggedIn) {
            return (
                <div id="App">
                    <Logo />
                    <TodosContainer />
                </div>
            );
        }

        return (
            <div id="App">
                <Logo />
                <Login />
            </div>
        );
    }
}
