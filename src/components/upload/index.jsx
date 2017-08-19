import React, { Component } from 'react';
import axios from 'axios';
var env = require('./../../configs/env.json');
var config = require('./../../configs/config.' + env.current + '.json');

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_uri: null,
            processing: false
        }

        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        //e.preventDefault();
        const _this = this;

        this.setState({
            processing: true
        });

        axios.post(config.serveraddress + '/upload/', {
            data_uri: this.state.data_uri,
            filename: this.state.filename,
            filetype: this.state.filetype
        })
            .then(function (response) {
                _this.setState({
                    processing: false,
                    uploaded_uri: response.data.uri
                });
                _this.props.onUpload(response.data.uri);
            })
            .catch(function (error) {
                _this.setState({
                    processing: false,
                });
            });

    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: file.name,
                filetype: file.type
            },() =>{
                this.handleSubmit();
            });
        };

        reader.readAsDataURL(file);
    }

    render() {
        let uploaded;

        if (this.state.uploaded_uri) {
            uploaded = (
                <div>
                    <blockquote>
                        A imagem foi enviada. <br/>
                        Link da imagem: {this.state.uploaded_uri}
                    </blockquote>
                </div>
            );
        }

        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <label>Foto do produto</label>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input type="file" onChange={this.handleFile} />
                    </form>
                    {uploaded}
                </div>
            </div>
        );
    }
}

export default ImageUploader;