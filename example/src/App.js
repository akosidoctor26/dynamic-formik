import React from 'react';

import './App.css';

import DynamicFormik from 'dynamic-formik';

function App() {
  return <DynamicFormik>{(formi) => <h1>Finally!</h1>}</DynamicFormik>;
}

export default App;
