import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formikHelpers from '../../../utils/helpers';

const Radio = React.memo(({ disabled, name, onBlur, onChange, options, value }) => {
  const onLocalChange = (e) => onChange(e.target.value);
  return (
    <div className={classNames('dynamic-formik-radio', { disabled })}>
      {options.map((option) => (
        <div key={`${name}-${option.value}`}>
          <input
            type="radio"
            className="dynamic-formik-radio--input"
            disabled={disabled}
            name={name}
            value={option.value}
            checked={option.value === value}
            onBlur={onBlur}
            onChange={onLocalChange}
          />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
}, formikHelpers.areEqual);

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
