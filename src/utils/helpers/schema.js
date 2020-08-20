import * as Yup from 'yup';

import * as formikConstants from '../constants';
import { getObjectValueFromString, setObjectValueFromString } from './common';

/**
 * Used by React.memo to allow rerender of fields only when `value` and `disabled` change
 * @param {Object} prevProps
 * @param {Object} nextProps
 */
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.disabled === nextProps.disabled &&
    (prevProps.options && nextProps.options
      ? prevProps.options.length === nextProps.options.length
      : true)
  );
};

/**
 * Generates fields values from `fields` from schema
 * @param {Object[]} fields
 */
const getFieldsValuesFromSchema = (fields, modelName) => {
  return fields?.reduce((acc, field) => {
    if (field.type === 'array') {
      //type of tabular will generate array of fields
      acc[field.name] = [{ ...getFieldsValuesFromSchema(field.fields) }];
    } else if (field.type === 'object') {
      // type of object will generate object of fields
      acc[field.name] = { ...getFieldsValuesFromSchema(field.fields) };
    } else {
      //Warning: changing this from undefined to an empty string can break the VOD add title flow.
      acc[field.name] = undefined;
    }
    return acc;
  }, {});
};

/**
 * Generate initialValues from the overall schema
 * Initial values must always match the schema to get a valid formik value.
 * @param {Object} schema
 * @param {string} schema.name
 * @param {Object[]} schema.fields
 * @param {string} modelName
 */
const getInitialValuesFromSchema = (schema, modelName) => {
  // Root object must have name and fields
  if (!schema) return {};
  if (!(schema?.name && schema?.fields)) return;
  // one parent

  return { [schema.name]: getFieldsValuesFromSchema(schema.fields, modelName, schema.name) };
};

/**
 * Generates Yup validation from schema
 * See: https://github.com/jquense/yup for validations
 * @param {object} fields
 * @param {object} yupMapping Just to preserve yupMapping
 */
const getValidationSchemaForFields = (fields, yupMapping) => {
  return fields?.reduce((acc, field) => {
    if (field.type === 'array' || field.type === 'table') {
      acc[field.name] = Yup.array().of(
        Yup.object().shape({
          ...getValidationSchemaForFields(field.fields, yupMapping)
        })
      );
    } else if (field.type === 'object') {
      acc[field.name] = Yup.object().shape({
        ...getValidationSchemaForFields(field.fields, yupMapping)
      });
    } else {
      let yupFieldValidation = Yup[yupMapping[field.type]](); // get equivalent type for yup first

      if (field.required) yupFieldValidation = yupFieldValidation.required('Required');

      yupFieldValidation = yupFieldValidation.max(field.maxLength);

      // Additional validations from the schema
      if (typeof field.validations === 'function') {
        yupFieldValidation = field.validations(yupFieldValidation);
      }

      acc[field.name] = yupFieldValidation;
    }
    return acc;
  }, {});
};

/**
 * Please see Yup library and Formik's guide to validation
 * https://jaredpalmer.com/formik/docs/guides/validation
 * @param {Object} schema
 */
const getValidationSchema = (schema, yupMapping = formikConstants.DEFAULT_YUP_MAPPING) => {
  // Root object must have name and fields
  if (!schema) return {};
  if (!(schema?.name && schema?.fields)) return;

  // one root
  return {
    [schema.name]: Yup.object().shape({
      ...getValidationSchemaForFields(schema.fields, yupMapping)
    })
  };
};

export {
  areEqual,
  getInitialValuesFromSchema,
  getObjectValueFromString,
  getValidationSchema,
  setObjectValueFromString
};
