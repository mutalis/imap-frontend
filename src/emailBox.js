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

  const modifyEmail = emailId => {
    const url = `https://my-json-server.typicode.com/mutalis/imap-frontend/emails/${emailId}`
    return R.partial(fetch, [url])
  }

  const deleteEmail = (event, emailId) => {
    event.preventDefault()
    const config = {
      method: 'DELETE',
    }
    modifyEmail(emailId)(config)
    .then(response => {
      console.log(response)
      if (response.status === 200) setEmails(emails.filter(email => email.id !== emailId))
    })
    .catch(error => console.log('Delete Email error:',error))
  }

  const emailComponents = () => emails.map(({id, username, quota}) =>
    <Email key={id} emailId={id} username={username} quota={quota} modifyEmail={modifyEmail(id)} deleteEmail={deleteEmail}/>)

  return (
    <EmailList>
      {emailComponents()}
    </EmailList>
  )
}
