import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

import Checkbox from './controls/checkbox';
import Radio from './controls/radio';
import Select from './controls/select';
import Textarea from './controls/textarea';
import Textbox from './controls/textbox';

/*
field: name, onBlur, onChange, value
meta: error, initialError, initialTouched, initialValue, touched, value
helpers: setError, setTouched, setValue
props: metadata schema field props (label, maxLength, options, readonly, required, config(for anything else specific to the control) )
*/
const DefaultFieldWrapper = React.memo(
  ({ name, type, validations: ignore, ...props }) => {
    // data and helpers from formik
    const [field, meta, helpers] = useField(name);

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

    const onBlur = () => helpers.setTouched(true);
    const onChange = (value) => helpers.setValue(value);

    const CustomField = getField();
    return (
      <div
        className={classNames('dyamic-formik__field-wrapper', type, name.replace('.', '-'), {
          disabled: props.disabled,
          error: meta.touched && meta.error
        })}
      >
        <CustomField
          {...field}
          disabled={props.disabled}
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
