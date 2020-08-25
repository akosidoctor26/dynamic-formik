import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formikHelpers from '../../utils/helpers';

const Select = React.memo(
  ({ className, disabled, name, onBlur, onChange, options, required, value }) => {
    const onLocalChange = (e) => onChange(e.target.value);

    return (
      <div className={classNames('dyamic-formik__field-select', { className, disabled })}>
        <select
          name={name}
          onChange={onLocalChange}
          onBlur={onBlur}
          required={required}
          value={value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
  formikHelpers.common.areEqual
);

Select.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  options: []
};
Select.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};
export default Select;
