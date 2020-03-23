import React from 'react';
import { render } from '@testing-library/react';
import CenteredText from './CenteredText';

test('Shows the centered text', () => {
  const { getByText } = render(<CenteredText>test</CenteredText>);
  const element = getByText(/test/i);
  expect(element).toBeInTheDocument();
});
