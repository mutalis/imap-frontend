import React, { useState, useEffect } from 'react'
import { EmailList } from './emailList'
import { Email } from './email'
import * as R from 'ramda'

export const EmailBox = ({domainName='test.com'}) => {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    getEmails(domainName)
  }, [domainName] )

  const getEmails = domainName => {
    const emails = [{id: 1, username: 'user 1', quota: 10}, {id: 2, username: 'user 2', quota: 20}]
    setEmails(emails)
    return emails
  }
  // http://api.example.com:3000/v2/emails/
  const updateEmail = (emailId) => {}
  const emailComponents = () => emails.map(email => <Email key={email.id} username={email.username} quota={email.quota} updateEmail={updateEmail(email.id)}/>)
  return (
    <EmailList>
      {emailComponents()}
    </EmailList>
  )
}
