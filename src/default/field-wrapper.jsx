import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';

import Checkbox from './controls/checkbox';
import Radio from './controls/radio';
import Select from './controls/select';
import Textarea from './controls/textarea';
import Textbox from './controls/textbox';
import formikHelpers from '../utils/helpers';

/*
field: name, onBlur, onChange, value
meta: error, initialError, initialTouched, initialValue, touched, value
helpers: setError, setTouched, setValue
props: metadata schema field props (label, maxLength, options, readonly, required, config(for anything else specific to the control) )
*/
const DefaultFieldWrapper = React.memo(
  ({ conditions = {}, name, type, validations: ignore, ...props }) => {
    // data and helpers from formik
    const [field, meta, helpers] = useField(name);
    const formik = useFormikContext();
    const conditionProps = formikHelpers.schema.getConditions({ conditions, name }, formik);

    useEffect(() => {
      if (
        conditionProps &&
        conditionProps.value !== undefined &&
        conditionProps.value !== field.value
      ) {
        console.log('value changed', conditionProps, field.value);
        helpers.setValue(conditionProps.value);
      }
    }, [conditionProps, conditionProps.newValue, conditionProps.value, field.value, helpers]);

    // field props
    const onBlur = () => helpers.setTouched(true);
    const onChange = (value) => helpers.setValue(value);
    const disabled = conditionProps.disabled || props.disabled;
    const hidden = conditionProps.hidden || props.hidden;

    if (hidden) return null;

    const getField = () => {
      switch (type) {
        case 'checkbox':
          return Checkbox;
        case 'textarea':
          return Textarea;
        case 'radio':
          return Radio;
        case 'select':
          return Select;
        default:
          return Textbox;
      }
    };

    const CustomField = getField();
    return (
      <div
        className={classNames('dyamic-formik__field-wrapper', type, name.replace('.', '-'), {
          disabled,
          error: meta.touched && meta.error
        })}
      >
        <CustomField
          {...field}
          disabled={disabled}
          required={props.required}
          label={props.label}
          maxLength={props.maxLength}
          onBlur={onBlur}
          onChange={onChange}
          options={props.options}
          placeholder={`${props.label}${props.required ? '*' : ''}`}
          {...props.config}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.disabled === nextProps.disabled &&
      JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
    );
  }
);

DefaultFieldWrapper.defaultProps = {
  config: {}
};
export default DefaultFieldWrapper;
