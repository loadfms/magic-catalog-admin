import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
    render() {
        return (
            <header>
                <nav className="top-nav blue-grey darken-4">
                    <div className="container">
                        <div className="nav-wrapper"><a className="page-title">{this.props.title}</a></div>
                    </div>
                </nav>

                <ul id="nav-mobile" className="side-nav fixed blue-grey darken-3">
                    <li className="bold"><Link to='/' className="waves-effect waves-blue-grey blue-grey-text text-lighten-2">Home</Link></li>
                    <li className="bold"><Link to='/category' className="waves-effect waves-blue-grey blue-grey-text text-lighten-2">Menu</Link></li>
                    <li className="bold"><Link to='/product' className="waves-effect waves-blue-grey blue-grey-text text-lighten-2">Produtos</Link></li>
                </ul>
            </header>
        );
    }
}

export default Menu;