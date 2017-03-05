import React, { Component } from 'react';

import Menu from './../components/menu/index';

class Home extends Component {
    render() {
        return (
            <div>
                <Menu title="Home" />
                <main>
                    <div className="container">
                        <div className="col s12" />
                        <div className="section">
                            <h4>Introduction</h4>
                            <p className="caption">This is a slide out menu. You can add a dropdown to your sidebar by using our collapsible component. If you want to see a demo, our sidebar will use this on smaller screens. To use this in conjunction with a fullscreen navigation, you have to use two copies of the same UL.</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;