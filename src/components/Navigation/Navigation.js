import React, { Component } from 'react';
import './Navigation.css';

class Navigation extends Component {


    render() {

        if (this.props.isSignedIn) {
            return (<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChange('signout')}>Sign out</p></nav>
            );
        }
        else {
            return (
                <div>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChange('signin')}>Sign in</p>
                        <p className="f3 link dim black underline pa3 pointer" onClick={() => this.props.onRouteChange('Register')}>Register</p>
                    </nav>
                </div>
            )
        }
    }
}

export default Navigation;