import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import Navigation from './src/navigations/index'
import store from './src/redux/store'

export default function App() {
  return (
    <Provider store = {store}>
      <Navigation/>
    </Provider>
  );
}