import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import Cookies from 'universal-cookie';


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
  
  onLogin(){
    if (this.state.user == 'valiadmin' && this.state.password == 'adolfo'){
      const cookies = new Cookies();
      cookies.set('user', this.state.user, { path: '/' });  
      this.props.onLoginDone();
    } else {
      alert('Usuário ou senha invalidos.')
    }
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