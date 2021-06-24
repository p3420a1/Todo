import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigation from './src/Navigation/Index';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
