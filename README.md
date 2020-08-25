# RENDER FORMIK FORM USING JSON SCHEMA

(STILL IN PROGRESS)

##TODO

- Storybook for sample app
- Dynamic Lookup Source (API)

## FEATURES

- Generate a Form using a JSON schema.
- Nested Objects or Arrays.
- Conditional fields - Sets field property based on other field's value/prop on the same level
  - hidden
  - disabled
  - value
- Generate Yup validation from the form's schema

```
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

```

![Rendered Form from the schema above](/sample-app/images/sample-app.gif)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
