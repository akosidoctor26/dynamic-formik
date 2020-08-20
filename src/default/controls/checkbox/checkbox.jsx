import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox as SemCheckbox } from '../radio/node_modules/semantic-ui-react';
import './media-cloud-checkbox.scss';

const Checkbox = React.memo(({ disabled, name, onChange, placeholder, value }) => {
  const onCheck = (e, data) => {
    onChange(data.checked);
  };

  return (
    <SemCheckbox
      className="component__formik--media-cloud-checkbox"
      key={name}
      disabled={disabled}
      name={name}
      checked={value}
      onClick={onCheck}
      label={placeholder}
    />
  );
});

Checkbox.defaultProps = {
  onChange: () => {}
};
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.bool
};

export default Checkbox;
