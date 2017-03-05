import React, { Component } from 'react';
import axios from 'axios';
var env = require('./../configs/env.json');
var config = require('./../configs/config.' + env.current + '.json');

import Menu from './../components/menu/index';

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            mode: 'list'
        }

        this.newItem = this.newItem.bind(this);
    }
    
    componentWillMount() {
        this.loadData();
    }
    

    loadData() {
        axios.get(config.serveraddress + '/product')
            .then(function (response) {
                this.setState({ products: response.data.rows });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    newItem() {
        this.setState({ mode: 'new' });
    }

    renderList() {
        return (
            <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric">Nome</th>
                        <th className="mdl-data-table__cell--non-numeric">Status</th>
                        <th className="mdl-data-table__cell--non-numeric">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(function (object, i) {
                        return (
                            <tr key={object.id}>
                                <td className="mdl-data-table__cell--non-numeric">{object.name}</td>
                                <td className="mdl-data-table__cell--non-numeric"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">{object.status ? 'visibility' : 'visibility_off'}</i></td>
                                <td className="mdl-data-table__cell--non-numeric">
                                    <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">settings</i>
                                    <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete_forever</i>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        )
    }

    renderForm() {
        return (
            <form action="#">
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="username" />
                    <label className="mdl-textfield__label" htmlFor="username">Username</label>
                </div> <br />
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="password" id="userpass" />
                    <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                </div>
            </form>
        )
    }

    renderMode() {
        if (this.state.mode === 'list') {
            return this.renderList();
        }

        if (this.state.mode === 'new') {
            return this.renderForm();
        }
    }

    render() {
        return (
            <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <Menu />
                <main className="mdl-layout__content mdl-color--grey-100">
                    <div className="mdl-grid">
                        <div className="mdl-layout-spacer"></div>
                        <div className="mdl-cell mdl-cell--10-col">
                            <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                                <div className="mdl-card__title">
                                    <h2 className="mdl-card__title-text">Produto
                                        <small> Aqui você pode cadastrar, alterar e excluir os seus produtos.</small>
                                    </h2>
                                </div>
                                <div className="mdl-card__supporting-text">
                                    {this.renderMode()}
                                </div>
                                <div className="mdl-card__actions mdl-card--border">
                                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        Cadastrar
    </a>
                                </div>

                            </div>

                        </div>
                        <div className="mdl-layout-spacer"></div>
                    </div>
                </main>
                <a onClick={this.newItem} id="view-source" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-color-text--white"><i className="material-icons">add</i></a>

            </div>
        );
    }
}

export default Product;