import React, { useState, useEffect } from 'react'
import { EmailList } from './emailList'
import { Email } from './email'

export const EmailBox = ({domainName}) => {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    getEmails(domainName)
  }, [emails] )

  const getEmails = (domainName) => {
    const emails = [{id: 1, username: 'user 1', quota: 10}, {id: 2, username: 'user 2', quota: 20}]
    setEmails(emails)
    return emails
  }

  const emailComponents = () => emails.map(email => <Email key={email.id} username={email.username} quota={email.quota} />)
  return (
    <EmailList>
      {emailComponents()}
    </EmailList>
  )
}
