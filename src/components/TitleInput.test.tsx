import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TitleInput from './TitleInput';

test('Renders the input and set values correctly', () => {
  const handleChange = jest.fn();

  const { getByTestId } = render(<TitleInput setValue={handleChange} />);

  const element = getByTestId('TitleInput') as HTMLInputElement;
  expect(element).toBeInTheDocument();

  userEvent.type(element, 'test');
  expect(handleChange).toHaveBeenCalled();
  expect(element.value).toBe('test');
});
