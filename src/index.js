import React from 'react';
import ReactDOM from 'react-dom';
import DomainBox from './DomainBox/DomainBox';
import EmailBox from './EmailBox/EmailBox';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={DomainBox}/>
    <Route path="/:domainName/:domainId" component={EmailBox}/>
  </Router>
), document.getElementById('root'));
