import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/index';
import Navigation from './src/Navigation/Index';
import {AlanView} from './AlanSDK.js';
import {NativeEventEmitter, NativeModules} from 'react-native';

const { AlanManager, AlanEventEmitter } = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const subscription = alanEventEmitter.addListener('command', (data) => {
  console.log(`got command event ${JSON.stringify(data)}`);
  // {"command":"showAlert","text":"text"}
  createAlert(data.text);
});
export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount() {
    subscription.remove();
  };
  
  render(){
    return (
      <Provider store={store}>
        <AlanView projectId={'f41cdf563db563fcb64da921a02f5dca2e956eca572e1d8b807a3e2338fdd0dc/stage'}/>
        <Navigation />
      </Provider>
    )}
}