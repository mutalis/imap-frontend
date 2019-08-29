import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import { Email } from './email'

test('renders "the default email" when the email component dont have props', () => {
  const { getByTestId } = render(<table><tbody><Email /></tbody></table>)

  expect(getByTestId('username')).toHaveTextContent('username undefined')
  expect(getByTestId('quota')).toHaveValue(0)
})

// test('Fetch Emails', async () => {
//   axios.get.mockResolvedValueOnce({data: {greeting: 'hello there'}})

//   const domainName = 'example.com'
//   const {getByText, getByTestId} = render(<Email domainName={domainName} />)
//   fireEvent.click(getByText(/fetch/i))

//   const greetingNode = await waitForElement(() => getByTestId('greeting'))

//   expect(axios.get).toHaveBeenCalledTimes(1)
//   expect(axios.get).toHaveBeenCalledWith(url)
//   expect(greetingNode).toHaveTextContent('hello there')
// })

// test('Updates Email quota', () => {
//   const updateEmail = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve({
//       results: [
//         {quota: 30},
//       ],
//     }),
//   })
//   )
//   const {getByTestId, getByText} = render(
//     <table><tbody><Email updateEmail={updateEmail} quota={2} /></tbody></table>
//   )

//   getByTestId('quota').value = 30
//   expect(getByTestId('quota')).toHaveValue(30)
//   fireEvent.click(getByText(/update/i))
//   expect(updateEmail).toHaveBeenCalledTimes(1)
//   // expect(mock("foo")).toBe("bar");
//   console.log(updateEmail())
//   expect(updateEmail).toHaveBeenCalledWith('30')

// })

// test('calls delete email', () => {
  

//   const {getByText} = render(
//     <table><tbody><Email updateEmail={updateEmail} quota={2} /></tbody></table>
//   )
//   getByText(/delete/i).click()
//   expect(updateEmail).toHaveBeenCalledTimes(1)
//   // expect(updateEmail).toHaveBeenCalledWith(90)
// })

// it('parses the response of fetch correctly', done => {
//   const fakeFetch = () => Promise.resolve({
//     json: () => Promise.resolve({
//       results: [
//         {name: 'cat'},
//       ],
//     }),
//   })
//   getAnimals(fakeFetch, 12345)
//     .then(result => {
//       assert(result.name === 'cat')
//       done()
//     })
// })
