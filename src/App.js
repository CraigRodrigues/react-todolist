import React, { Component } from 'react';
import { auth } from './firebase';

import Logo from './Logo';
import Loading from './Loading';
import Login from './Login';
import Logout from './Logout';
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
        // listener for logging in and out
        auth.onAuthStateChanged((user) => {
            user
                ? this.setState({ loggedIn: true, loading: false })
                : this.setState({ loggedIn: false, loading: false });
        });
    }

    renderContainer() {
        // decides which main body to render
        if (this.state.loading) {
            return <Loading />;
        }

        if (this.state.loggedIn) {
            return (
                <React.Fragment>
                    <Logout />
                    <TodosContainer />
                </React.Fragment>
            );
        }

        return <Login />;
    }

    render() {
        return (
            <div id="App">
                <Logo />
                {this.renderContainer()}
            </div>
        );
    }
}
