import React from 'react';

import schema from './schema';
import './App.css';

import DynamicFormik, { ObjectGroup, schemaHelpers } from 'dynamic-formik';

function App() {
  const initialValues = schemaHelpers.getInitialValuesFromSchema(schema);
  console.log(initialValues);
  return (
    <DynamicFormik initialValues={initialValues}>
      {(formik) => {
        console.log(formik.values)
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
