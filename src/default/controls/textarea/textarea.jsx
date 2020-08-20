import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TextArea as SemTextArea } from '../radio/node_modules/semantic-ui-react';

import { formikHelpers } from '../radio/node_modules/utils/formik'; //todo move to generic helper file
import './media-cloud-textarea.scss';

const Textarea = React.memo(
  ({ disabled, maxLength, name, onBlur, onChange, placeholder, required, value, ...props }) => {
    const onLocalChange = (e, data) => {
      if (maxLength === -1 || maxLength - data.value.length > 0) {
        onChange(data.value);
      } else {
        onChange(data.value.substring(0, maxLength));
      }
    };

    return (
      <SemTextArea
        className={classNames('dynamic-formik--media-cloud-textarea', { disabled })}
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
