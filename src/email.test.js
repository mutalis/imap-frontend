import React from 'react'
import { render } from '@testing-library/react'
import { Email } from './email'

test('renders "the default email" when the email component dont have props', () => {
  const { getByTestId } = render(<table><tbody><Email /></tbody></table>)

  expect(getByTestId('username')).toHaveTextContent('username undefined')
  expect(getByTestId('quota')).toHaveValue(0)
})

test('calls onSubmit with quota', () => {
  const formCallback = jest.fn()
  const {getByTestId, getByText} = render(
    <table><tbody><Email formCallback={formCallback} quota={2} /></tbody></table>
  )
  getByTestId('quota').value = 30
  expect(getByTestId('quota')).toHaveValue(30)
  getByText(/save/i).click()
  expect(formCallback).toHaveBeenCalledTimes(1)
  expect(formCallback).toHaveBeenCalledWith('30')
})
