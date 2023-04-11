import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Input from "../components/Input";
import { InputProps } from "../components/Input.types";

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {},
} as Meta<typeof Input>;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  error: false,
  disabled: false,
  label: "Primary",
};

export const Success = Template.bind({});
Success.args = {
  error: false,
  success: true,
  disabled: false,
  label: "Success",
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  disabled: false,
  message: "Error",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Disabled",
};
