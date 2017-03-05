import React, { Component } from 'react';
import axios from 'axios';
var env = require('./../configs/env.json');
var config = require('./../configs/config.' + env.current + '.json');

import Menu from './../components/menu/index';

class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            mode: 'list',
            name: undefined
        }

        this.newItem = this.newItem.bind(this);
        this.saveData = this.saveData.bind(this);
        this.setName = this.setName.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }


    loadData() {
        axios.get(config.serveraddress + '/category')
            .then(function (response) {
                this.setState({ categories: response.data.rows });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    saveData() {
        axios.post(config.serveraddress + '/category', { name: this.state.name })
            .then(function (response) {
                this.loadData();
                this.newItem();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteData(e) {
        if (confirm('Confirma a exclusão?')) {
            axios.delete(config.serveraddress + '/category/' + e.target.dataset['id'])
                .then(function (response) {
                    this.loadData();
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    newItem() {
        if (this.state.mode == 'list') {
            this.setState({ mode: 'new' });
        }
        else {
            this.setState({ mode: 'list' });
        }
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    renderList() {
        let _this = this;
        return (
            <div>
                <p className="caption">Aqui você pode alterar ou incluir mais menus superiores no site.</p>
                <table className="bordered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(function (object, i) {
                            return (
                                <tr key={object.id}>
                                    <td>{object.name}</td>
                                    <td>
                                        <i className="material-icons">settings</i>
                                        <i className="material-icons" data-id={object.id} onClick={_this.deleteData} style={{cursor:'pointer'}}>delete</i>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    renderForm() {
        return (
            <div className="row">
                <p className="caption">Cadastrando um novo menu.</p>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="last_name" type="text" className="validate" onChange={this.setName} />
                        <label htmlFor="last_name">Nome</label>
                    </div>
                </div>

                <a className="waves-effect waves-light btn" onClick={this.saveData}>salvar</a> &nbsp;
                <a className="waves-effect waves-light btn" onClick={this.newItem} >cancelar</a>
            </div>
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

            <div>
                <Menu title="Menu" />
                <main>
                    <div className="container">
                        <div className="col s12" />
                        <div className="section">
                            {this.renderMode()}
                        </div>
                        {(this.state.mode == 'list' ? <a className="btn-floating btn-large waves-effect waves-light blue-grey darken-3 right" onClick={this.newItem}><i className="material-icons">add</i></a> : null)}

                    </div>
                </main>
            </div>
        );
    }
}

export default Category;