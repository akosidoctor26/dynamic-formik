import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

import Checkbox from './controls/checkbox';
import Radio from './controls/radio';
import Select from './controls/select';
import Textarea from './controls/textarea';
import Textbox from './controls/textbox';
import { DynamicFormikContext } from '../dynamic-formik';

/*
field: name, onBlur, onChange, value
meta: error, initialError, initialTouched, initialValue, touched, value
helpers: setError, setTouched, setValue
props: metadata schema field props (label, maxLength, options, readonly, required, config(for anything else specific to the control) )
*/
const FieldWrapper = React.memo(
  ({ name, type, conditions = {}, validations: ignore, ...props }) => {
    // data and helpers from formik
    const [field, meta, helpers] = useField(name);
    const [options, setOptions] = useState(props.options);
    const formContext = useContext(DynamicFormikContext);

    const nameGroups = name.split('.');
    const fieldName = nameGroups[nameGroups.length - 1];
    const parentName = nameGroups[nameGroups.length - 2]?.match(/[\w\s]+/)?.[0];

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

    const onBlur = useCallback(() => helpers.setTouched(true), [helpers]);

    /**
     * Field change handler
     * @function
     * @param {*} value New field value
     */
    const onChange = useCallback(
      (value) => {
        helpers.setValue(value);
      },
      [helpers]
    );

    useEffect(() => {
      // Reset changes when field becomes hidden
      if (meta.value !== meta.initialValue) {
        onChange(meta.initialValue);
      }
    }, [meta.initialValue, meta.value, onChange]);

    const onFocus = async () => {
      // if it's props and there is no options set from the schema
      if (type === 'lookup' && !props.options) {
        setOptions(() => []);
        const newOpts = await formContext.lookupSource({
          fieldName: fieldName,
          groupName: parentName,
          name: name,
          ...props
        });
        setOptions(newOpts);
      }
    };

    const onSearchChange = async (data) => {
      if (props.isConditional) {
        const newOpts = await formContext.lookupSource(
          {
            fieldName: fieldName,
            groupName: parentName,
            name: name,
            ...props
          },
          data.searchQuery
        );
        setOptions(newOpts);
      }
    };

    /**
     * Get the field based on what type is in the schema
     */
    const CustomField = getField();

    // Check if the field is disabled
    const disabled = props.disabled;

    return (
      <div
        className={classNames('dynamic-formik--field', type, name.replace('.', '-'), {
          disabled,
          error: meta.touched && meta.error,
          wholeWidth: props.maxLength >= 20000 && type === 'textarea'
        })}
      >
        <label htmlFor={props.id || name}>
          {props.label} {props.required && `*`}
        </label>
        <div className="dynamic-formik--field--wrapper">
          {/** show error as text on top of the field instead of placeholder  */}
          {!field.value && meta.touched && meta.error && <span>{meta.error}</span>}
          <CustomField
            {...field}
            disabled={disabled}
            required={props.required}
            maxLength={props.maxLength}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onSearchChange={onSearchChange}
            options={options}
            {...props.config}
          />
        </div>
      </div>
    );
  }
);

FieldWrapper.defaultProps = {
  config: {}
};

export default FieldWrapper;
