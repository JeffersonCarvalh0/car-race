import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TitleButton from './TitleButton';

test('Confirm button from start screen', () => {
  const handleActiveClick = jest.fn();
  const handleInactiveClick = jest.fn();

  const { getByText } = render(
    <>
      <TitleButton
        label="active"
        onClick={handleActiveClick}
        isVisible={true}
      />
      <TitleButton
        label="inactive"
        onClick={handleInactiveClick}
        isVisible={false}
      />
    </>,
  );

  const activeButton = getByText('active');
  const inactiveButton = getByText('inactive');

  userEvent.click(activeButton);
  userEvent.click(inactiveButton);

  expect(handleActiveClick).toHaveBeenCalled();
  expect(handleInactiveClick).not.toHaveBeenCalled();
  expect(activeButton).toBeVisible();
  expect(inactiveButton).not.toBeVisible();
});
