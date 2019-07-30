import React from 'react'
import { render } from '@testing-library/react'
import { Email } from './email'

test('renders "the default email" when the email component dont have props', () => {
  const { getByTestId } = render(<table><tbody><Email /></tbody></table>)

  expect(getByTestId('username')).toHaveTextContent('username undefined')
  expect(getByTestId('quota')).toHaveValue(0)
})

test('calls onSubmit with quota', () => {
  const updateEmail = jest.fn()
  const {getByTestId, getByText} = render(
    <table><tbody><Email updateEmail={updateEmail} quota={2} /></tbody></table>
  )
  getByTestId('quota').value = 30
  expect(getByTestId('quota')).toHaveValue(30)
  getByText(/update/i).click()
  expect(updateEmail).toHaveBeenCalledTimes(1)
  expect(updateEmail).toHaveBeenCalledWith('30')
})

test('calls delete email', () => {
  const updateEmail = jest.fn()
  const {getByText} = render(
    <table><tbody><Email updateEmail={updateEmail} quota={2} /></tbody></table>
  )
  getByText(/delete/i).click()
  expect(updateEmail).toHaveBeenCalledTimes(1)
  // expect(updateEmail).toHaveBeenCalledWith(90)
})
