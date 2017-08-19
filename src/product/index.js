import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'react-materialize';
import ImageUploader from './../components/upload/index'
var env = require('./../configs/env.json');
var config = require('./../configs/config.' + env.current + '.json');

import Menu from './../components/menu/index';

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            categories: [],
            selectedcategories: [],
            mode: 'list',
            name: '',
            description: '',
            id: undefined,
            uriimage: undefined,
            search: '',
            filteredlist: []
        }

        this.newItem = this.newItem.bind(this);
        this.saveData = this.saveData.bind(this);
        this.setName = this.setName.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.update = this.update.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setUrlImage = this.setUrlImage.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setSearch = this.setSearch.bind(this);
    }

    componentWillMount() {
        this.loadData();
        this.loadCategories();
    }

    loadData() {
        axios.get(config.serveraddress + '/product')
            .then(function (response) {
                this.setState({ products: response.data.rows });
                this.filter();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    loadCategories() {
        axios.get(config.serveraddress + '/category')
            .then(function (response) {
                this.setState({ categories: response.data.rows });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    filter() {
        let filtered = this.state.products;
        if (this.state.search) {
            let keywords = this.state.search;
            filtered = filtered.filter(function (item) {
                return (item.name.toLowerCase().indexOf(keywords.toLowerCase()) != -1);
            });
        }

        this.setState({ filteredlist: filtered });
    }

    selectCategories() {
        axios.get(config.serveraddress + '/category/product/' + this.state.id)
            .then(function (response) {
                this.setState({ selectedcategories: response.data });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

    }

    getData() {
        let data = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.uriimage,
            status: true
        }

        return data;
    }

    saveCategoriesProduct(){
        axios.post(config.serveraddress + '/categoryproduct/' + this.state.id + '/' + this.state.selectedcategories.join(","))
            .then(function (response) {
                console.log
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    saveData() {
        let data = this.getData();

        axios.post(config.serveraddress + '/product', data)
            .then(function (response) {
                this.setState({id: response.data.rows[0].id})
                this.saveCategoriesProduct();
                this.loadData();
                this.newItem();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteData(e) {
        if (confirm('Confirma a exclusão?')) {
            axios.delete(config.serveraddress + '/product/' + e.target.dataset['id'])
                .then(function (response) {
                    this.loadData();
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    newItem() {
        this.setState({ id: undefined, name: '', description: '', uriimage: '', search: '', selectedcategories: [] }, () =>{
            this.filter();                        
        });
        if (this.state.mode === 'list') {
            this.setState({ mode: 'new' });
        }
        else {
            this.setState({ mode: 'list' });
        }
    }

    setName(e) {
        this.setState({ name: e.target.value });
    }

    setDescription(e) {
        this.setState({ description: e.target.value });
    }

    setCategory(e) {
        let tempArray = this.state.selectedcategories;
        if (e.target.checked) {
            tempArray.push(parseInt(e.target.id, 10));
        } else {
            let index = tempArray.indexOf(e.target.id)
            tempArray.splice(index, 1)
        }
    }

    setUrlImage(uri) {
        this.setState({
            uriimage: uri
        });
    }

    setSearch(e) {
        this.setState({
            search: e.target.value
        }, () => {
            this.filter();
        })
    }

    update(e) {
        this.setState({ mode: 'update', id: e.target.dataset["id"], name: e.target.dataset["name"], description: e.target.dataset["description"], uriimage: e.target.dataset["uriimage"] }, () => {
            this.selectCategories();
        });
    }

    updateData() {
        let data = this.getData();

        data.id = this.state.id;

        axios.put(config.serveraddress + '/product', data)
            .then(function (response) {
                this.saveCategoriesProduct();
                this.loadData();
                this.newItem();
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    renderList() {
        let _this = this;
        return (
            <div>
                <p className="caption">Aqui você pode alterar ou incluir os produtos no site.</p>
                <div className="row">
                    <div className="col input-field s12"><input type="text" id="search" onChange={this.setSearch} defaultValue={this.state.search} /><label htmlFor="search">Busca</label></div>
                </div>
                <table className="bordered">
                    <thead>
                        <tr>
                            <th className="mdl-data-table__cell--non-numeric">Nome</th>
                            <th className="mdl-data-table__cell--non-numeric">Status</th>
                            <th className="mdl-data-table__cell--non-numeric">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filteredlist.map(function (object, i) {
                            return (
                                <tr key={object.id}>
                                    <td className="mdl-data-table__cell--non-numeric">{object.name}</td>
                                    <td className="mdl-data-table__cell--non-numeric"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">{object.status ? 'visibility' : 'visibility_off'}</i></td>
                                    <td className="mdl-data-table__cell--non-numeric">
                                        <i className="material-icons" data-id={object.id} data-name={object.name} data-description={object.description} data-uriimage={object.image} onClick={_this.update} style={{ cursor: 'pointer' }}>settings</i>
                                        <i className="material-icons" data-id={object.id} onClick={_this.deleteData} style={{ cursor: 'pointer' }}>delete</i>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    renderForm() {
        let _this = this;
        let haveImage;

        if (this.state.uriimage) {
            haveImage = (
                <img src={this.state.uriimage} role="presentation" />
            );
        }

        return (
            <div className="row">
                <p className="caption">Cadastrando um novo produto....</p>

                <div className="row">
                    <Input s={12} label="Nome" onChange={this.setName} defaultValue={this.state.name} validate />
                </div>
                <div className="row">
                    <Input s={12} label="Descrição" onChange={this.setDescription} defaultValue={this.state.description} validate />
                </div>
                <div className="row">
                    {haveImage}
                </div>
                <div className="row">
                    <div className="col s12">
                        <ImageUploader onUpload={this.setUrlImage} />
                    </div>
                </div>
                <div className="row">
                    {this.state.categories.map((object, i) => {
                        return (
                            <div className="col s12" key={i}>
                                <input type="checkbox" id={object.id} defaultChecked={this.state.selectedcategories.includes(object.id)} onChange={this.setCategory} />
                                <label htmlFor={object.id}>{object.name}</label>
                            </div>
                        )
                    })}
                </div>
                <a className="waves-effect waves-light btn" onClick={this.state.mode === 'new' ? this.saveData : this.updateData}>salvar</a> &nbsp;
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

        if (this.state.mode === 'update') {
            return this.renderForm();
        }
    }

    render() {
        return (
            <div>
                <Menu title="Produto" />
                <main>
                    <div className="container">
                        <div className="col s12" />
                        <div className="section">
                            {this.renderMode()}
                        </div>
                        {(this.state.mode === 'list' ? <a className="btn-floating btn-large waves-effect waves-light blue-grey darken-3 right" onClick={this.newItem}><i className="material-icons">add</i></a> : null)}

                    </div>
                </main>
            </div>
        );
    }
}

export default Product;
