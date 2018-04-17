import React from 'react';
import { auth } from './firebase';

export default class Logout extends React.Component {
    logout() {
        auth.signOut().catch((error) => console.error(error));
    }

    render() {
        return <button onClick={this.logout}>Logout</button>;
    }
}
