import React, { useState, useEffect } from 'react'
import { EmailList } from './emailList'
import { Email } from './email'
import * as R from 'ramda'
const fetch = require('node-fetch')

export const EmailBox = ({domainName='test.com'}) => {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    getEmails(domainName)
  }, [domainName] )

  const getEmails = domainName => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/domains/1/emails`
    fetch(url)
    .then(response => response.json())
    .then(jsonEmails => {
      console.log(jsonEmails)
      setEmails(jsonEmails)
    })
    .catch(error => console.log('GetEmails error:',error))
    // const emails = [{id: 1, username: 'user 1', quota: 10}, {id: 2, username: 'user 2', quota: 20}]
    // setEmails(emails)
  }

  const updateEmail = emailId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/${emailId}`
    return R.partial(fetch, [url])
  }

  const emailComponents = () => emails.map(email => <Email key={email.id} emailId={email.id} username={email.username} quota={email.quota} updateEmail={updateEmail(email.id)}/>)
  return (
    <EmailList>
      {emailComponents()}
    </EmailList>
  )
}
