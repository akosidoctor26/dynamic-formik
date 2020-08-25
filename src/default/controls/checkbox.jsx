import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import formikHelpers from '../../utils/helpers';

const Checkbox = React.memo(({ className, disabled, name, onChange, label, value }) => {
  const onCheck = (e) => onChange(e.target.checked);

  return (
    <div className={classNames('dynamic-formik__field-checkbox', { className, disabled })}>
      <label key={value}>
        <input
          type="checkbox"
          key={name}
          disabled={disabled}
          name={name}
          checked={!!value}
          onChange={onCheck}
        />
        {label}
      </label>
    </div>
  );
}, formikHelpers.common.areEqual);

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
