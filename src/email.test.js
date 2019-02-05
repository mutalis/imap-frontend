import React from 'react'
import { render } from 'react-testing-library'
import Email from './email'

it('renders Learn React message', () => {
  const { getByText } = render(<Email />)

  expect(getByText('user')).toBeInTheDocument()
  expect(getByText('0')).toBeInTheDocument()
})
