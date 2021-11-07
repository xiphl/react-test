import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      userid:"",     
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub, userid: userInfo.username})
    });
    // this.props.keycloak.loadUserProfile().then(userInfo => {
    //     this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub, userid: userInfo.username})
    // });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>        
        <p>username: {this.state.userid}</p>        
      </div>
    );
  }
}
export default UserInfo;