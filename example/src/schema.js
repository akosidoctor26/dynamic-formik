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
      type: 'textarea'
    },
    {
      name: 'isRemote',
      label: 'Is Remote?',
      type: 'checkbox'
    },
    {
      name: 'experience',
      label: 'Experience',
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
