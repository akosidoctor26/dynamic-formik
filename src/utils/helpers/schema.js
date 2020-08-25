import * as Yup from 'yup';

import * as formikConstants from '../constants';

/**
 * Generates fields values from `fields` from schema
 * @param {Object[]} fields
 */
const getFieldsValuesFromSchema = (fields) => {
  return fields?.reduce((acc, field) => {
    if (field.type === 'array') {
      //type of tabular will generate array of fields
      acc[field.name] = [{ ...getFieldsValuesFromSchema(field.fields) }];
    } else if (field.type === 'object') {
      // type of object will generate object of fields
      acc[field.name] = { ...getFieldsValuesFromSchema(field.fields) };
    } else {
      //Warning: changing this from undefined to an empty string can break the VOD add title flow.
      acc[field.name] = '';
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
 */
const getInitialValuesFromSchema = (schema) => {
  // Root object must have name and fields
  if (!schema) return {};
  if (!(schema?.name && schema?.fields)) return;
  // one parent

  return { [schema.name]: getFieldsValuesFromSchema(schema.fields, schema.name) };
};

/**
 * Generates Yup validation from schema
 * See: https://github.com/jquense/yup for validations
 * @param {object} fields
 * @param {object} yupMapping Just to preserve yupMapping
 */
const getValidationSchemaForFields = (fields, yupMapping) => {
  return fields?.reduce((acc, field) => {
    if (field.type === 'array') {
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
      const yupFieldType = yupMapping[field.type];

      let yupFieldValidation = Yup[yupFieldType](); // get equivalent type for yup first

      if (field.required) yupFieldValidation = yupFieldValidation.required('Required');

      if (yupFieldType !== 'boolean' && field.maxLength)
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
  return Yup.object().shape({
    [schema.name]: Yup.object().shape({
      ...getValidationSchemaForFields(schema.fields, yupMapping)
    })
  });
};

export { getInitialValuesFromSchema, getValidationSchema };
