import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ArrayGroup from './array-group';
import { DynamicFormikContext } from './dynamic-formik';

const ObjectGroup = React.memo(({ mode, parent, schema }) => {
  const formContext = useContext(DynamicFormikContext);
  const FieldWrapper = formContext.FieldWrapper;
  const fieldTypes = Object.values(formContext.fieldTypes);

  const renderBasedOnType = (field) => {
    if (fieldTypes.includes(field.type)) {
      return (
        <FieldWrapper
          {...field}
          key={field.name}
          name={`${parent ? `${parent}.${field.name}` : `${schema.name}.${field.name}`}`} // Finally, render the control with the name constructed from parent
          mode={mode}
        />
      );
    }

    if (field.type === 'object') {
      return (
        <ObjectGroup
          key={field.name}
          schema={field}
          parent={parent ? `${parent}.${field.name}` : `${schema.name}.${field.name}`} // The key of this group is needed for constructing the name of the child
          mode={mode}
        />
      );
    }

    if (field.type === 'array') {
      return (
        <ArrayGroup
          key={field.name}
          parent={parent ? `${parent}.${field.name}` : schema.name} // The key of this group is needed for constructing the name of the child
          directParentType={schema.type} // We need to determine if the parent is tabular or object
          schema={field}
          mode={mode}
        />
      );
    }

    return null;
  };

  return (
    <div className="dynamic-formik-object-group">
      {schema.fields &&
        schema.fields.map((field) => {
          return renderBasedOnType(field);
        })}
    </div>
  );
});

ObjectGroup.displayName = 'ObjectGroup';
ObjectGroup.propTypes = {
  mode: PropTypes.string,
  parent: PropTypes.string,
  schema: PropTypes.object
};
export default ObjectGroup;
