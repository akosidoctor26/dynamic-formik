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
      type: 'text'
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { key: 'qa', value: 'qa', text: 'QA' },
        { key: 'dev', value: 'dev', text: 'DEV' },
        { key: 'ba', value: 'ba', text: 'BA' }
      ]
    },
    {
      name: 'projects',
      label: 'Projects',
      type: 'array',
      maxLength: 3,
      required: true,
      fields: [
        {
          name: 'projectName',
          label: 'Project Name',
          type: 'text'
        }
      ]
    }
  ]
};

export default schema;
