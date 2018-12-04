import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import Routes from './client/routes';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

// @ts-ignore
const renderMethod = !!window.__SERVER_STATE__ ? ReactDOM.hydrate : ReactDOM.render;

function render() {
  return renderMethod(
    <App />,
    // @ts-ignore
    document.querySelector('#root')
  );
}

render();
