import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import Cookies from 'universal-cookie';
import axios from 'axios';

var env = require('./../../configs/env.json');
var config = require('./../../configs/config.' + env.current + '.json');


class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      password: undefined
    }

    this.setValue = this.setValue.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  setValue(e) {
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  onLogin() {
    axios.post(config.serveraddress + '/login', { user: this.state.user, password: this.state.password })
      .then(function (response) {
        const cookies = new Cookies();
        cookies.set("user", response.data, { path: '/' });
        this.props.onLoginDone();
      }.bind(this))
      .catch(function (error) {
        alert('Usuário ou senha invalidos.')
      });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <h1>Valibrasil admin</h1>
          <Input s={6} label="Usuario" name="user" onChange={this.setValue} defaultValue={this.state.name} validate />
          <Input s={6} type="password" label="Senha" name="password" onChange={this.setValue} defaultValue={this.state.password} validate />
          <Button waves='light' onClick={this.onLogin}>Login</Button>
        </div>
      </div>
    );
  }
}

export default login;