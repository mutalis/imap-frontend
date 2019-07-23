import React from 'react'
import { render } from '@testing-library/react'
import { Email } from './email'

test('renders "the default email" when the email component dont have props', () => {
  const { getByTestId } = render(<table><tbody><Email /></tbody></table>)

  expect(getByTestId('username')).toHaveTextContent('username undefined')
  expect(getByTestId('quota')).toHaveValue(0)
})
