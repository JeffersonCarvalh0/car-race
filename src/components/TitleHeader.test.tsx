import React from 'react';
import { render } from '@testing-library/react';
import TitleHeader from './TitleHeader';

test('Shows the expected message', () => {
  const { getByText } = render(<TitleHeader text="test" />);
  const element = getByText(/test/i);
  expect(element).toBeInTheDocument();
});
