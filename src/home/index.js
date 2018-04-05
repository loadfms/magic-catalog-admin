import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Menu from './../components/menu/index';
import Login from './../components/login/index';
import axios from 'axios';
var env = require('./../configs/env.json');
var config = require('./../configs/config.' + env.current + '.json');

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false
        };

        this.checkCookie = this.checkCookie.bind(this);
    }
    componentDidMount() {
        this.checkCookie();
    }

    checkCookie() {
        const cookies = new Cookies();
        let hash = cookies.get('user');
        let _this = this;

        axios.post(config.serveraddress + '/checklogin', { hash: hash })
            .then(function (response) {
                _this.setState({ logged: true });
                cookies.set("loggedin", true, { path: '/' });
            }.bind(this))
            .catch(function (error) {
                _this.setState({ logged: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.logged ?
                    <div>
                        <Menu title="Home" />
                        <main>
                            <div className="container">
                                <div className="col s12" />
                                <div className="section">
                                    <h4>Bem vindo</h4>
                                    <p className="caption">Parte administrativa do site valibrasil.</p>
                                </div>
                            </div>
                        </main>
                    </div> :
                    <Login onLoginDone={this.checkCookie} />
                }
            </div>
        );
    }
}

export default Home;