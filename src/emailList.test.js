import React from "react"
import { render } from "react-testing-library"
import EmailList from "./emailList"
import Email from "./email"

test('renders "no emails" when there are no emails', () => {
  const { getByText } = render(<EmailList ></EmailList>)
  expect(getByText(/No emails/i)).toBeInTheDocument()
})

test('renders "the default email" when the email component dont have props', () => {
  const { getByText } = render(
    <EmailList>
      <Email />
    </EmailList>
  )
  expect(getByText(/user name/i)).toBeInTheDocument()
  expect(getByText(/0/i)).toBeInTheDocument()
})

test("renders emails with the right username", () => {
  const { getAllByTestId } = render(
    <EmailList>
      <Email username="user 1" quota={10} />
      <Email username="user 2" quota={20} />
    </EmailList>
  )
  const usernames = getAllByTestId("username").map(usernameEntry => usernameEntry.textContent)
  expect(usernames).toMatchInlineSnapshot(`
Array [
  "user 1",
  "user 2",
]
`)
})
