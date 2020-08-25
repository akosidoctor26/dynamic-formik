import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formikHelpers from '../../utils/helpers';

const Radio = React.memo(
  ({ className, disabled, label, name, onBlur, onChange, options, value }) => {
    const onLocalChange = (e) => onChange(e.target.value);
    return (
      <div className={classNames('dynamic-formik__field-radio', { className, disabled })}>
        <div>{label}</div>
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              disabled={disabled}
              name={name}
              value={option.value}
              checked={option.value === value}
              onBlur={onBlur}
              onChange={onLocalChange}
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  },
  formikHelpers.common.areEqual
);

Radio.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  options: []
};
Radio.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      //##TODO: Define somewhere because it's being used by select too
      key: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  )
};
export default Radio;
