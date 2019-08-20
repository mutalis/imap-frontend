import React from 'react'
import { EmailBox } from './emailBox'
import { DomainBox } from './domainBox'
import { Email } from './email'

const app = () => { 
  return (
    <>
      <DomainBox userId={77} />
      <EmailBox domainName='1' />
      <Email />
    </>
  )
}

export default app
