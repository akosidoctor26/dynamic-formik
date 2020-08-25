import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formikHelpers from '../../utils/helpers';

const Textbox = React.memo(
  ({
    className,
    disabled,
    maxLength,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required,
    value,
    ...props
  }) => {
    const onLocalChange = (e) => {
      const data = e.target;
      if (maxLength === -1 || maxLength - data.value.length > 0) {
        onChange(data.value);
      } else {
        onChange(data.value.substring(0, maxLength));
      }
    };

    return (
      <div className={classNames('dyamic-formik__field-textbox', { className, disabled })}>
        <input
          data-lpignore={true}
          disabled={disabled}
          name={name}
          onBlur={onBlur}
          onChange={onLocalChange}
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          type="text"
          value={value}
          {...props}
        />
      </div>
    );
  },
  formikHelpers.common.areEqual
);

Textbox.displayName = 'Textbox';
Textbox.defaultProps = {
  maxLength: -1,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {}
};

Textbox.propTypes = {
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default Textbox;
