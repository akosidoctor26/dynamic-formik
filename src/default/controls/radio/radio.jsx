import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Radio as SemRadio } from 'semantic-ui-react';

import { formikHelpers } from 'utils/formik';
import './media-cloud-radio.scss';

const Radio = React.memo(({ disabled, name, onBlur, onChange, options, value }) => {
  const onLocalChange = (e, data) => onChange(data.value);
  return (
    <div className={classNames('component__formik--media-cloud-radio', { disabled })}>
      {options.map((option) => (
        <SemRadio
          className="component__formik--media-cloud-radio--input"
          key={`${name}-${option.value}`}
          disabled={disabled}
          name={name}
          value={option.value}
          checked={option.value === value}
          onBlur={onBlur}
          onChange={onLocalChange}
          label={option.text}
        />
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
