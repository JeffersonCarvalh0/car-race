import React from 'react';
import { render } from '@testing-library/react';
import Overlay from './Overlay';

test('Shows the pause overlay', () => {
  const { getByText } = render(<Overlay text="Paused" />);
  const element = getByText(/Paused/i);
  expect(element).toBeInTheDocument();
});
