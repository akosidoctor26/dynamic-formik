import React from 'react';

import schema from './schema';
import './App.css';

import DynamicFormik, { ObjectGroup } from 'dynamic-formik';

function App() {
  return (
    <DynamicFormik initialValues={{}}>
      {(formik) => {
        console.log(formik.values);
        return (
          <>
            <h1>Finally!</h1>
            <ObjectGroup schema={schema} />
          </>
        );
      }}
    </DynamicFormik>
  );
}

export default App;
