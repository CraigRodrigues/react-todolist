import React from 'react';
import { auth } from './firebase';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    login() {
        // clear the error then sign in, the listener will react to it in App
        this.setState({ error: null }, () => {
            auth
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .catch((error) => this.setState({ error }));
        });
    }

    // controlled component
    render() {
        return (
            <div id="login">
                <h2>Login</h2>
                <div>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Password"
                    />
                </div>
                {this.state.error && <div>{this.state.error.message}</div>}
                <button onClick={this.login}>Login</button> <button>Create New Account</button>
            </div>
        );
    }
}
