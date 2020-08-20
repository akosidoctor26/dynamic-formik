import React from 'react';
import logo from './logo.svg';

import './App.css';

import DynamicFormik from 'dynamic-formik';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <DynamicFormik>{(formi) => <h1>Finally!</h1>}</DynamicFormik>
      </div>
    </div>
  );
}

export default App;
