import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TitleInput from './TitleInput';

test('Renders the input and set values correctly', () => {
  const handleChange = jest.fn();

  const { getByTestId } = render(<TitleInput setValue={handleChange} />);

  const element = getByTestId('TitleInput') as HTMLInputElement;
  expect(element).toBeInTheDocument();

  fireEvent.change(element, { target: { value: 'test' } });
  expect(handleChange).toHaveBeenCalled();
  expect(element.value).toBe('test');
});
