import React from 'react'
import { render } from '@testing-library/react'
import { EmailBox } from './emailBox'

test('renders emails with the right username for a given Domain Name', () => {
  const { getAllByTestId } = render(<EmailBox domainName='test.com' />)

  const usernames = getAllByTestId('username').map(usernameEntry => usernameEntry.textContent)
  expect(usernames).toMatchInlineSnapshot(`
Array [
  "user 1",
  "user 2",
]
`)
})
