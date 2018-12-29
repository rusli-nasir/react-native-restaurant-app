import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configure';

const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Main />
      </Provider>
    );
  }
}

