import React from 'react'
import { render } from '@testing-library/react'
import { DomainBox } from './domainBox'

test('renders domains with the right domain name for a given UserId', () => {
  const { getAllByTestId } = render(<DomainBox userId={77} />)

  const domainNames = getAllByTestId('domainname').map(domainNameEntry => domainNameEntry.textContent)
  expect(domainNames).toMatchInlineSnapshot(`
  Array [
    "domain name 1",
    "domain name 2",
  ]
`)
})
