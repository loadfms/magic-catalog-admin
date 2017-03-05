import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Home from './home/index';
import Category from './category/index';
import Product from './product/index';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/category" component={Category} />
    <Route path="/product" component={Product} />
  </Router>),
  document.getElementById('root')
);