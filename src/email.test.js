import React from 'react'
import { render } from 'react-testing-library'
import Email from './email'

it('renders "the default email" when the email component dont have props', () => {
  const { getByText } = render(<table><tbody><Email /></tbody></table>)

  expect(getByText(/user name/i)).toBeInTheDocument()
  expect(getByText(/0/i)).toBeInTheDocument()
})
