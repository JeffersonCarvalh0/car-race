import React from 'react';
import { render } from '@testing-library/react';
import PauseOverlay from './PauseOverlay';

test('Shows the pause overlay', () => {
  const { getByText } = render(<PauseOverlay />);
  const element = getByText(/Paused/i);
  expect(element).toBeInTheDocument();
});
