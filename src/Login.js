import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div id="login">
                <h2>Login</h2>
                <input type="text" value={this.state.email} placeholder="Email" />
                <input type="text" value={this.state.password} placeholder="Password" />
                <button>Login</button>
                <button>Create New Account</button>
            </div>
        );
    }
}