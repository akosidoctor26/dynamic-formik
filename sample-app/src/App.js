import React from 'react';

import schema from './schema';
import 'milligram/dist/milligram.css';
import './App.scss';

import DynamicFormik, { ObjectGroup, schemaHelpers } from 'dynamic-formik';

function App() {
  const initialValues = schemaHelpers.getInitialValuesFromSchema(schema);
  const onSubmit = (values) => console.log(values);
  return (
    <DynamicFormik initialValues={initialValues} onSubmit={onSubmit} fullSchema={schema}>
      {(formik) => {
        console.log(formik.errors);
        return (
          <>
            <h1>Basic Form rendered from JSON schema (using Formik)</h1>
            <ObjectGroup schema={schema} />
            <input type="submit" value="Submit" />
          </>
        );
      }}
    </DynamicFormik>
  );
}

export default App;
