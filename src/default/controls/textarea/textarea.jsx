import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import formikHelpers from '../../../utils/helpers';

const Textarea = React.memo(
  ({ disabled, maxLength, name, onBlur, onChange, placeholder, required, value, ...props }) => {
    const onLocalChange = (e) => {
      const data = e.target.value;
      if (maxLength === -1 || maxLength - data.value.length > 0) {
        onChange(data.value);
      } else {
        onChange(data.value.substring(0, maxLength));
      }
    };

    return (
      <textarea
        className={classNames('dyamic-formik__textarea', { disabled })}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={onLocalChange}
        placeholder={placeholder}
        required={required}
        value={value}
        {...props}
      />
    );
  },
  formikHelpers.areEqual
);

Textarea.defaultProps = {
  maxLength: -1,
  onBlur: () => {},
  onChange: () => {}
};
Textarea.propTypes = {
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default Textarea;
