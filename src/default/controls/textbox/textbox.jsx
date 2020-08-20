import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { formikHelpers } from '../radio/node_modules/utils/formik';
import ClearSVG from 'images/mobile_card_close.svg';
import SVG from 'hoc/cached-svg';
import './media-cloud-textbox.scss';

/**
 * Controlled Input
 */
const Textbox = React.memo(
  ({
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

    const onClear = () => {
      onBlur();
      onChange('');
    };

    return (
      <div className={classNames('component__formik--media-cloud-textbox', { disabled })}>
        <div className="ui input">
          <input
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onChange={onLocalChange}
            onFocus={onFocus}
            placeholder={placeholder}
            required={required}
            value={value}
            data-lpignore={true}
            {...props}
          />
        </div>
        {value && (
          <div className="component__formik--media-cloud-textbox--clear" onClick={onClear}>
            <SVG src={ClearSVG} />
          </div>
        )}
      </div>
    );
  },
  formikHelpers.areEqual
);

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
