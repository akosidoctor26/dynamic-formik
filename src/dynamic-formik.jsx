import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import { DEFAULT_FIELD_TYPES } from './utils/constants';

const DynamicFormikContext = createContext({});
/**
 *
 * @param {Object} props ...props is meant for Formik properties
 */
const DynamicFormik = ({ children, fieldTypes, name, lookupSource, ...props }) => {
  return (
    <Formik {...props}>
      {(formik) => (
        <DynamicFormikContext.Provider
          value={{ fieldTypes, formName: name, lookupSource: lookupSource }}
        >
          <Form>{children(formik)}</Form>
        </DynamicFormikContext.Provider>
      )}
    </Formik>
  );
};

DynamicFormik.defaultProps = {
  fieldTypes: DEFAULT_FIELD_TYPES,
  lookupSource: () => {}
};
DynamicFormik.propTypes = {
  children: PropTypes.isRequired,
  name: PropTypes.string.isRequired,
  lookupSource: PropTypes.func
};

export default DynamicFormik;
export { DynamicFormikContext };
