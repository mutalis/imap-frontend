import React from 'react'
import { render } from '@testing-library/react'
import { DomainList } from './domainList'
import { Domain } from './domain'

test('renders "no domains" when there are no domains', () => {
  const { getByText } = render(<DomainList ></DomainList>)
  expect(getByText(/No domains/i)).toBeInTheDocument()
})

test('renders "the default domain" when the domain component dont have props', () => {
  const { getByText } = render(
    <DomainList>
      <Domain />
    </DomainList>
  )
  expect(getByText(/the domain name/i)).toBeInTheDocument()
  expect(getByText(/0/i)).toBeInTheDocument()
})

test('renders domains with the right domain name', () => {
  const { getAllByTestId } = render(
    <DomainList>
      <Domain domainname='domain name 1' quota={10} />
      <Domain domainname='domain name 2' quota={20} />
    </DomainList>
  )
  const domainNames = getAllByTestId('domainname').map(domainNameEntry => domainNameEntry.textContent)
  expect(domainNames).toMatchInlineSnapshot(`
Array [
  "domain name 1",
  "domain name 2",
]
`)
})
