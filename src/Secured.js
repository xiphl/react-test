import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from './UserInfo';
import Logout from './Logout';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
//For API Requests
import axios from "axios";
import Tab from "react-bootstrap/Tab";

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = {        
        datasetrows: [],
        datasetcols: [],        
      };
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
    
    axios.get("https://petstore.swagger.io/v2/store/inventory", {}).then((res) => {        
        this.setState({
            datasetcols: res['data']['available'],
            
        })
    })
    this.setState({
        headers: ["sn", "Dataset_Name"],
        values: [{"1":"a","2":"ab"},{"1":"b","2":"bc"}]
    })      
    
  }

  render() {
    if(this.state.keycloak) {    
        console.log(this.state.datasetcols)    
      if(this.state.authenticated) return (
        <div>
            <p>This is a Keycloak-secured component of your application. You shouldn't be able
            to see this unless you've authenticated with Keycloak.</p>
            <UserInfo keycloak={this.state.keycloak} />
            <Logout keycloak={this.state.keycloak} />                  
            <div>
            <h3>Datahub Tagging UI</h3>
            </div>  
            <div className="container">                        
            <table id="datasetTable" className="table table-striped table-bordered table-sm row-border hover mb-5">
                <thead>
                <tr>
                    {this.state.headers.map((result) => {
                      return <th key={result}>{result}</th>;
                    })}
                </tr>

                </thead>
                <tbody>                
                
                    {this.state.values.map((result) => {
                    return(
                    <tr>
                      <td>{result[1]}</td>
                      <td>{result[2]}</td>
                    </tr>
                    )})}
                
                </tbody>
            </table>                           
            </div>
          
        </div>
      
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;