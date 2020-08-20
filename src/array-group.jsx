/* eslint-disable react/display-name */
import React from 'react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';

import ObjectGroup from './object-group';
import helpers from './utils/helpers';

/**
 * ArrayGroup contains array of FieldGroup
 * The name of the control is like an address of the value in the form.
 * For example, a control with a name of Rights and Restrictions.Station Embargo[0].custom_tab_station_embargo is equivalent to
 * '{ Rights and Restrictions: { Station Embargo: [{custom_tab_station_embargo: '' }] } }' in the form values.
 */
const ArrayGroup = React.memo(({ schema, parent, directParentType }) => {
  // Get empty array row/entry using the schema.
  const valueFromSchema = helpers.schema.getInitialValuesFromSchema(schema);

  // Construct the value's string path
  const arrayGetterKey = directParentType !== 'array' ? `${parent}.${schema.name}` : parent;

  return (
    <FieldArray name={arrayGetterKey}>
      {(fieldArrayHelpers) => {
        /**
         * Since the controls are named like an an address path to the form's value
         * We need to directly get the value from the form values using a string path 'arrayGetterKey'
         * Then, we will use this in rendering entries
         */
        const arrayValues = helpers.common.getObjectValueFromString(
          fieldArrayHelpers.form.values,
          arrayGetterKey
        );

        /**
         * allowAdd depends on maxLength prop in the schema
         */
        const allowAdd =
          (schema.maxLength === undefined ||
            schema.maxLength === -1 ||
            arrayValues?.length < schema.maxLength) &&
          schema.fields.some((field) => !field.readonly);

        /**
         * allowRemove depends on required in the schema. If there is one item in the group, hide the remove button.
         */
        const allowRemove =
          (!schema.required || (schema.required && arrayValues?.length > 1)) &&
          schema.fields.some((field) => !field.readonly);

        // Adds an empty row/entry
        const onAddClick = () => {
          fieldArrayHelpers.push(valueFromSchema[schema.name]);
        };

        /**
         * Removes selected row/entry
         * @param {number} index
         */
        const onRemoveClick = (index) => {
          fieldArrayHelpers.remove(index);
        };

        return (
          <div className="dynamic-formik-array-group">
            {arrayValues?.map?.((field, arrayIndex) => (
              <div className="dynamic-formik-array-group--entry" key={schema.name + arrayIndex}>
                <div className="dynamic-formik-array-group--header">
                  <div>{`${schema.label} ${arrayIndex + 1}`}</div>
                  {allowRemove && (
                    <div
                      className="dynamic-formik-array-group--remove"
                      onClick={() => onRemoveClick(arrayIndex)}
                    >
                      <span>X</span>
                    </div>
                  )}
                </div>

                <ObjectGroup
                  schema={schema}
                  parent={`${arrayGetterKey}[${arrayIndex}]`} // The key of this group is needed for constructing the name of the child
                />
              </div>
            ))}
            {allowAdd && (
              <div className="dynamic-formik-array-group--add" onClick={onAddClick}>
                <span>+</span>
                <div className="dynamic-formik-array-group--add-text">
                  <p>ADD NEW ENTRY</p>
                  <p>{schema.label}</p>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </FieldArray>
  );
});

ArrayGroup.propTypes = {
  schema: PropTypes.object, //schema of this group
  parent: PropTypes.string, // The key of the parent for constructing the name of this group
  directParentType: PropTypes.string // A array group can be a child of another array field - Used to determine the name that will be constructed based on parentType
};
export default ArrayGroup;
