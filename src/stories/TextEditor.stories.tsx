import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import TextEditor from '../components/TextEditor';
import { TextEditorProps } from '../components/TextEditor.types';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/TextEditor',
  component: TextEditor,
  argTypes: {},
} satisfies Meta<typeof TextEditor>;

export default meta;

const Template: StoryFn<TextEditorProps> = (args) => <TextEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  disabled: false,
  text: 'Primary',
};