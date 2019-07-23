import React from 'react'
import { EmailBox } from './emailBox'
import { DomainBox } from './domainBox'
import { Email } from './email'
const app = () => { 
  return (
    <>
      <DomainBox userId={77} />
      <EmailBox domainName='test.net' />
      <table><tbody><Email /></tbody></table>
    </>
  )
}

export default app
