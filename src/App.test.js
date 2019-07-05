import React from 'react'
import { render } from '@testing-library/react'
import App from './app'

it('renders Learn React message', () => {
  const { getByText } = render(<App />)
  expect(getByText(`Learn React v${React.version}`)).toBeInTheDocument()
})
