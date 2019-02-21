import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { object } from 'prop-types';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import { getContext } from '../context';

const context = getContext();

export default class App extends React.PureComponent {
  static propTypes = {
    store: object.isRequired,
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter basename={`${context}/app`}>
          <div className="container">
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
