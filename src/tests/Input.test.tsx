import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../components/Input';

describe('Running Test for Input', () => {
  it('Check placeholder in Input', () => {
    const placeholder = 'Hello UI Component!';
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText('Hello UI Component!')).toHaveAttribute(
      'placeholder',
      placeholder
    );
  });

  it ('renders the Input component',async () => {
    const user = userEvent.setup();
    render(<Input placeholder={"test"} />);
    const input = screen.getByPlaceholderText("test") as HTMLInputElement;
    await user.type(input, 'Hello world!');
    expect(input.value).toBe('Hello world!');
  })
});