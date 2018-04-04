import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Menu from './../components/menu/index';
import Login from './../components/login/index';

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
        if (cookies.get('user') == "valiadmin") {
            this.setState({ logged: true });
        }
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