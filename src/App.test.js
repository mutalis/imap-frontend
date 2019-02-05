import React from 'react'
import { render } from 'react-testing-library'
import App from './app'

it('renders Learn React message', () => {
  const { getByText } = render(<App />)
  expect(getByText(`Learn React v${React.version}`)).toBeInTheDocument()
})
