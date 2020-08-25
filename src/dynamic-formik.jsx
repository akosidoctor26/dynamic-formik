import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import DefaultFieldWrapper from './default/field-wrapper';
import { DEFAULT_FIELD_TYPES } from './utils/constants';
import formikHelpers from './utils/helpers';

const DynamicFormikContext = createContext({});

/**
 * Wraps formik
 * @param {Object} props ...props is meant for Formik properties
 */
const DynamicFormik = ({
  arrayGroupRenderers,
  children,
  fieldTypes,
  FieldWrapper,
  fullSchema,
  name,
  lookupSource,
  ...props
}) => {
  console.log(fullSchema, formikHelpers.schema.getValidationSchema(fullSchema));
  return (
    <Formik validationSchema={formikHelpers.schema.getValidationSchema(fullSchema)} {...props}>
      {(formik) => (
        <DynamicFormikContext.Provider
          value={{ arrayGroupRenderers, fieldTypes, FieldWrapper, lookupSource: lookupSource }}
        >
          <Form>{children(formik)}</Form>
        </DynamicFormikContext.Provider>
      )}
    </Formik>
  );
};

DynamicFormik.displayName = 'DynamicFormik';
DynamicFormik.defaultProps = {
  arrayGroupRenderers: {
    addButton: <a href="#">Add New</a>,
    removeButton: <a href="#">Remove</a>
  },
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
