import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.memo(({ disabled, name, onChange, label, value }) => {
  const onCheck = (e) => onChange(e.target.checked);

  return (
    <input
      type="checkbox"
      className="dynamic-formik__checkbox"
      key={name}
      disabled={disabled}
      name={name}
      checked={!!value}
      onChange={onCheck}
      label={label}
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
  value: PropTypes.any
};

export default Checkbox;
