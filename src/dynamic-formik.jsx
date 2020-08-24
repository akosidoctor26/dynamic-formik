import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import DefaultFieldWrapper from './default/field-wrapper';
import { DEFAULT_FIELD_TYPES } from './utils/constants';

const DynamicFormikContext = createContext({});
/**
 *
 * @param {Object} props ...props is meant for Formik properties
 */
const DynamicFormik = ({ children, fieldTypes, FieldWrapper, name, lookupSource, ...props }) => {
  return (
    <Formik {...props}>
      {(formik) => (
        <DynamicFormikContext.Provider
          value={{ fieldTypes, FieldWrapper, lookupSource: lookupSource }}
        >
          <Form>{children(formik)}</Form>
        </DynamicFormikContext.Provider>
      )}
    </Formik>
  );
};

DynamicFormik.displayName = 'DynamicFormik';
DynamicFormik.defaultProps = {
  FieldWrapper: DefaultFieldWrapper,
  fieldTypes: DEFAULT_FIELD_TYPES,
  initialValues: {},
  lookupSource: () => {}
};
DynamicFormik.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string,
  lookupSource: PropTypes.func
};

export default DynamicFormik;
export { DynamicFormikContext };
