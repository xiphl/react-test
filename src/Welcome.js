import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

        componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        })

        }

  render() {
    if(!this.state.keycloak){
        return (
            <div className="Welcome">
                <p>Not logged in.</p>
            </div>
        )
    }else{
        return(
            <div>logged in</div>
        )
    }    
  }
}
export default Welcome;