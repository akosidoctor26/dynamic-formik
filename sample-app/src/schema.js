const schema = {
  name: 'basic',
  type: 'object',
  fields: [
    {
      name: 'fname',
      label: 'First Name',
      type: 'text'
    },
    {
      name: 'lname',
      label: 'Last Name',
      type: 'text',
      required: true
    },
    {
      name: 'background',
      label: 'Background',
      type: 'textarea'
    },
    {
      name: 'isRemote',
      label: 'Is Remote?',
      type: 'checkbox'
    },
    {
      name: 'withinUs',
      label: 'Living in US?',
      type: 'checkbox',
      // Conditional Fields
      conditions: {
        disabled: { whenField: 'isRemote', is: 'empty' },
        value: { whenField: 'isRemote', is: 'empty', newValue: false }
      }
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      // Conditional Fields
      conditions: {
        hidden: { whenField: 'isRemote', is: 'equal to', value: false },

        value: { whenField: 'isRemote', is: 'equal to', value: false, newValue: '' }
      }
    },
    {
      name: 'positions',
      label: 'Position',
      type: 'radio',
      options: [
        { key: 'junior', value: 'junior', label: 'Junior' },
        { key: 'senior', value: 'senior', label: 'Senior' }
      ]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { key: 'qa', value: 'qa', label: 'QA' },
        { key: 'dev', value: 'dev', label: 'DEV' },
        { key: 'ba', value: 'ba', label: 'BA' }
      ]
    },
    {
      name: 'projects',
      label: 'Projects',
      type: 'array', // Array of fields inside an object
      maxLength: 3,
      required: true,
      fields: [
        {
          name: 'projectName',
          label: 'Project Name',
          type: 'text'
        },
        {
          name: 'position',
          label: 'Position',
          type: 'text'
        }
      ]
    }
  ]
};

export default schema;
