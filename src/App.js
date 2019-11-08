import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import ContentView from './components/ContentView';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
      <ContentView />
    </Provider>
  );
}

export default App;
