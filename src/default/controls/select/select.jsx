import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown } from '../radio/node_modules/semantic-ui-react';

import { isEmpty } from 'utils';
import debounce from 'lodash/debounce';
import './media-cloud-select.scss';
import './media-cloud-select.multiple.scss';

/**
 * Single and multi-select are combined in one component. If functioning as a multi-select field, value prop is JSON string.
 */
class Select extends Component {
  selectDropdown = null;

  state = {
    isOpen: false,
    isTouched: false,
    dropDownOptions: []
  };

  tryMultiple = (value) => {
    if (!value) return [];

    try {
      return JSON.parse(value || '[]');
    } catch {
      return [value];
    }
  };

  /**
   * If field value is a valid metadata field choice, render in the dropdown as the only choice.
   * Performance: Wait until user interacts with dropdown before rendering all options.
   */
  initDropDownChoice = () => {
    const { options, value } = this.props;

    //find friendly display value, if avail
    if (!isEmpty(options)) {
      const dropdownValue = this.isMultiple() ? this.tryMultiple(value) : value;

      const match = options.filter((x) =>
        this.isMultiple() ? dropdownValue.includes(x.value) : x.value === value
      );

      if (match.length > 0) {
        this.setState({
          dropDownOptions: match
        });
      }
    } else if (value) {
      this.setState({
        dropDownOptions: this.isMultiple()
          ? this.tryMultiple(value).map((item) => ({ key: item, text: item, value: item }))
          : [{ key: value, text: value, value: value }]
      });
    }
  };

  /**
   * Make the custom styles visible when Select is open
   */
  displayCustom = () => {
    const clearBtn = this.selectDropdown.ref.querySelector(
      '.component__formik--media-cloud-select--menu-clear'
    );

    if (clearBtn) clearBtn.classList.add('visible');
  };

  /**
   * Used to customize the Select field
   */
  updateDropdownStyle = (selectDropdown) => {
    if (!this.selectDropdown) {
      // -- Modify semantic's menu
      this.selectDropdown = selectDropdown;

      const menu = this.selectDropdown.ref.querySelector('.menu');

      const wrapper = document.createElement('div');
      const clearBtn = document.createElement('div');
      const clearTxt = document.createElement('div');

      wrapper.className = 'component__formik--media-cloud-select--menu-wrapper';
      clearBtn.className = classNames('component__formik--media-cloud-select--menu-clear', {
        disabled: this.props.required
      });
      clearTxt.innerHTML = 'Clear';
      clearBtn.appendChild(clearTxt);
      clearBtn.onclick = this.onClear;
      menu.parentNode.insertBefore(wrapper, menu);

      wrapper.appendChild(menu);
      wrapper.appendChild(clearBtn);
    }
  };

  /**
   * Handler for custom "Clear" button added in the Select
   */
  onClear = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.props.onChange(!this.isMultiple() ? '' : JSON.stringify([]));
    this.setState({ isOpen: false });
    this.onClose();
  };

  isMultiple = () => {
    return this.props.maxLength > 1;
  };

  /**
   * Handler when the user clicks the select. Update Select's custom styles and feature
   */
  onClick = () => {
    const { value } = this.props;
    const clearBtn = this.selectDropdown.ref.querySelector(
      '.component__formik--media-cloud-select--menu-clear'
    );

    if (clearBtn) {
      if (!value) {
        clearBtn.classList.add('blank');
      } else {
        clearBtn.classList.remove('blank');
      }

      this.setState({ isOpen: true });
    }

    this.displayCustom();
  };

  /**
   * Handler when the Select is closed
   */
  onClose = () => {
    const clearBtn = this.selectDropdown.ref.querySelector(
      '.component__formik--media-cloud-select--menu-clear'
    );

    if (clearBtn) clearBtn.classList.remove('visible');

    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  /** Handler when dropdown open event happens */
  onOpen = () => {
    const { options, value } = this.props;

    //performance enhancement: only render all the drop down values in the DOM when user has touched the dropdown component
    this.setState({
      isTouched: true,
      dropDownOptions: isEmpty(options)
        ? value
          ? [{ key: 'key', text: value, value: value }]
          : []
        : options
    });
  };

  onLocalChange = (e, data) => {
    const { maxLength, onChange } = this.props;

    if (!this.isMultiple()) {
      //Dropdown accepss string when multiple=false
      onChange(data.value);
    } else if (maxLength - data.value.length >= 0) {
      //else data.value is array of string values
      onChange(JSON.stringify(data.value));
    }

    this.setState({ isOpen: false });
    this.onClose();
  };

  onSearchChange = debounce((e, data) => {
    this.props.onSearchChange(data);
  }, 200);

  //#region ----------------- REACT LIFECYCLE METHODS

  componentDidMount() {
    //this is needed in the use case when options are provided before component has mounted
    if (!this.state.isTouched) {
      this.initDropDownChoice();
    }
    this.updateDropdownStyle();
  }

  shouldComponentUpdate(nextProps, nextState) {
    //Performance Improvement
    //Using FastField's implementation as an inspiration
    //https://github.com/jaredpalmer/formik/blob/v1.5.7/src/FastField.tsx
    if (
      this.props.value !== nextProps.value ||
      this.props.disabled !== nextProps.disabled ||
      this.props.options !== nextProps.options ||
      this.state.isOpen !== nextState.isOpen ||
      this.state.isTouched !== nextState.isTouched ||
      this.state.dropDownOptions !== nextState.dropDownOptions
    )
      return true;

    return false;
  }

  componentDidUpdate(prevProps) {
    const { options, value } = this.props;

    //this is needed in the use case when options are provided after this component has mounted and dropdown has not been touched
    if (
      !this.state.isTouched &&
      (prevProps.options.length !== options.length || prevProps.value !== value)
    ) {
      this.initDropDownChoice();
    }
    //handles the use case if the user already has the dropdown open and options prop gets updated
    else if (
      this.state.isTouched &&
      prevProps.options.length !== options.length &&
      options.length > 0
    ) {
      this.setState({
        dropDownOptions: options
      });
    }
    this.updateDropdownStyle();
  }

  //#endregion

  render() {
    const { disabled, name, onBlur, onFocus, placeholder, search, value } = this.props;
    const { dropDownOptions, isOpen } = this.state;

    return (
      <Dropdown
        className={classNames('component__formik--media-cloud-select', {
          disabled
        })}
        disabled={disabled}
        multiple={this.isMultiple()}
        name={name}
        onBlur={onBlur}
        onChange={this.onLocalChange}
        onClick={this.onClick}
        onClose={this.onClose}
        onFocus={onFocus}
        onOpen={this.onOpen}
        onSearchChange={this.onSearchChange}
        options={dropDownOptions}
        open={isOpen}
        placeholder={placeholder}
        ref={(selectDropdown) => this.updateDropdownStyle(selectDropdown)}
        search={search}
        selection
        selectOnBlur={false}
        selectOnNavigation={false}
        value={this.isMultiple() ? this.tryMultiple(value) : value}
      />
    );
  }
}

Select.defaultProps = {
  maxLength: 1,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  options: [],
  search: true
};

Select.propTypes = {
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  search: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string
};
export default Select;
