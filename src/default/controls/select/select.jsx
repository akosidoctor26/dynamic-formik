import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import formikHelpers from '../../../utils/helpers';

const Select = React.memo(({ disabled, name, onBlur, onChange, options, value }) => {
  const onLocalChange = (e) => onChange(e.target.value);
  return (
    <select className={classNames('dyamic-formik__select', { disabled })} onChange={onLocalChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}, formikHelpers.areEqual);

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
      //##TODO: Define somewhere because it's being used by select too
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};
export default Select;
