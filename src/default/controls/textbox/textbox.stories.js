import React from 'react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import styles from '@sambego/storybook-styles';

import Textbox from './textbox';
import { State } from 'utils/storybook';

export const TextboxStory = () => {
  return (
    <State initialState={{ value: '' }}>
      {(state, setState) => (
        <div>
          <p>
            Note: Due to optimization, the component will only update when you change disabled or
            value. If you want to make a change to placeholder or maxLength on the fly using knobs,
            check/uncheck disabled or change the value. In most use cases, value and disabled are
            the most common properties that the user updates, that's why we have a checking in
            utils/formik.js areEqual() that check for these properties and only re-renders the
            component when one of these changes.
          </p>
          <Textbox
            name="mc-textbox"
            maxLength={number('maxLength', 20)}
            placeholder={text('placeholder', 'Enter value')}
            value={state.value}
            onChange={value => setState({ value: value })}
            disabled={boolean('disabled', false)}
          />
        </div>
      )}
    </State>
  );
};

TextboxStory.story = {
  name: 'Simple',
};
export default {
  title: 'Formik | Controls/Textbox',
  component: Textbox,
  decorators: [withKnobs, styles({ padding: '20px' })],
};
