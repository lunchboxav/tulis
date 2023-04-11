import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import Button  from '../components/Button';
import { ButtonProps } from '../components/Button.types';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  disabled: false,
  text: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  disabled: false,
  text: 'Secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  primary: false,
  disabled: true,
  text: 'Disabled',
};

export const Small = Template.bind({});
Small.args = {
  ...Primary.args,
  size: 'small',
  text: 'Small',
};

export const Medium = Template.bind({});
Medium.args = {
  ...Primary.args,
  size: 'medium',
  text: 'Medium',
};

export const Large = Template.bind({});
Large.args = {
  ...Primary.args,
  size: 'large',
  text: 'Large',
};